import db from '../models/index.js';
import { BakongKHQR, IndividualInfo, khqrData } from 'bakong-khqr';
import crypto from 'crypto';
import axios from 'axios';

const Payment = db.Payment;
console.log("CHECKING ENV IN CONTROLLER:", process.env.BAKONG_ACCOUNT_USERNAME);
const generateMD5 = (data) => {
    return crypto.createHash('md5').update(data).digest("hex");
};

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing with Bakong KHQR
 */

/**
 * @swagger
 * /payments/bakong/generate-qr:
 *   post:
 *     summary: Create a Bakong KHQR payment QR code
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 10.50
 *     responses:
 *       201:
 *         description: QR code successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 paymentId:
 *                   type: string
 *                   example: "12345"
 *                 qrString:
 *                   type: string
 *                   description: KHQR string to be rendered as QR code
 *                 md5Hash:
 *                   type: string
 *                   description: MD5 hash of the QR string
 *       500:
 *         description: Internal server error or Bakong SDK failure
 */

/**
 * @swagger
 * /payments/bakong/status/{paymentId}:
 *   get:
 *     summary: Check the status of a Bakong payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the payment to check
 *     responses:
 *       200:
 *         description: Payment status retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: string
 *                   enum: [pending, success]
 *                   example: success
 *                 details:
 *                   type: object
 *                   description: Additional Bakong transaction details (if available)
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Error checking status or Bakong API error
 */

const paymentController = {
    createBakongQR: async (req, res) => {
        const { amount, currency } = req.body; // Expect 'USD' or 'KHR' from Flutter

        try {
            // 1. Determine the correct currency object from SDK
            const selectedCurrency = (currency === 'KHR')
                ? khqrData.currency.khr
                : khqrData.currency.usd;

            // 2. Setup the Info object
            const info = new IndividualInfo(
                process.env.BAKONG_ACCOUNT_USERNAME,
                process.env.BAKONG_ACCOUNT_NAME,
                "Phnom Penh",
                {
                    amount: Number(amount),
                    currency: selectedCurrency, // Use the SDK's internal value
                    billNumber: `INV${Date.now()}`,
                    // Dynamic QRs with an amount REQUIRE an expiration
                    expirationTimestamp: Date.now() + (60 * 60 * 1000)
                }
            );

            const khqr = new BakongKHQR();
            const response = khqr.generateIndividual(info);

            console.log("SDK Response:", response);

            if (!response || response.status.code !== 0) {
                return res.status(400).json({
                    success: false,
                    message: response?.status?.message || "SDK failed"
                });
            }

            // 3. Variables must be declared or assigned properly to avoid crashes
            const qrString = response.data.qr;
            const md5Hash = generateMD5(qrString);

            // 4. GENERATE DEEP LINK (The "App Open" Magic)
            let deepLink = null;
            try {
                const linkRes = await axios.post(
                    "https://api-bakong.nbc.gov.kh/v1/generate_deeplink_by_qr",
                    { qr: qrString },
                    { headers: { 'Authorization': `Bearer ${process.env.BAKONG_TOKEN}` } }
                );
                deepLink = linkRes.data?.data?.shortLink;
            } catch (linkErr) {
                console.warn("Deep Link generation failed, falling back to QR only.");
            }

            // 5. Save to Database 
            const newPayment = await Payment.create({
                amount: amount,
                qrString: qrString,
                md5Hash: md5Hash,
                status: 'pending',
                userId: req.user ? req.user.id : 2
            });

            //6. return response
            return res.status(201).json({
                success: true,
                paymentId: newPayment.paymentId,
                qrString: qrString,
                md5Hash: md5Hash,
                deepLink: deepLink
            });

        } catch (error) {
            console.error("!!! Controller Error:", error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    checkStatus: async (req, res) => {
        try {
            const { paymentId } = req.params;
            const payment = await Payment.findByPk(paymentId);

            if (!payment) {
                return res.status(404).json({ message: "Payment not found" });
            }

            // If already marked success in our DB, return immediately
            if (payment.status === 'success') {
                return res.status(200).json({ success: true, status: 'success' });
            }

            // --- CALL REAL BAKONG API ---
            const BAKONG_API_URL = "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5";

            const bakongResponse = await axios.post(BAKONG_API_URL,
                { md5: payment.md5Hash },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.BAKONG_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // responseCode 0 = Success in Bakong's system
            if (bakongResponse.data.responseCode === 0) {
                payment.status = 'success';
                payment.externalTransactionId = bakongResponse.data.data.external_transaction_id;
                await payment.save(); // Update database so we don't have to call Bakong again

                return res.status(200).json({
                    success: true,
                    status: 'success',
                    details: bakongResponse.data.data
                });
            }

            // If Bakong doesn't see the payment yet
            return res.status(200).json({
                success: true,
                status: 'pending'
            });

        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Bakong Token Expired!");
            }
            console.error("Bakong API Error:", error.message);
            return res.status(500).json({ message: "Error checking status" });
        }
    }
};

export default paymentController;