import admin from "firebase-admin";
import fs from "fs";

// Load JSON key securely
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("../config/serviceAccountKey.json", import.meta.url))
);

// Initialize only if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://domra-7b540", // replace with your bucket
  });
}

// Export reusable Firebase services
const bucket = admin.storage().bucket();
const db = admin.firestore();

export { bucket, db };
