// // server/src/server.js
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import session from 'express-session';

// 3. Load your database 
import db from './models/index.js';

// 4. Load remaining configs and routes
import './init.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import wordTranslationRoutes from './routes/wordTranslationRoutes.js';
import passport from './config/passport.config.js';
import favWordRoutes from './routes/favWordRoutes.js';
import CategoryRouter from './routes/categoryRoutes.js';
import WordRequestRouter from './routes/wordRequestRoutes.js';
import correctionRequestRoutes from './routes/correctionRequestRoutes.js';
import { bucket } from './services/firebaseService.js';
import jwt from "jsonwebtoken";
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

console.log("Attempting to run server...");
console.log("Checking DB User:", process.env.DB_USER); // Debug line to verify loading

app.use(express.json());
// Define allowed origins once
const allowedOrigins = [
  'https://domra-tech.vercel.app',
  'http://localhost:5173',
  'http://localhost:51102',
  'http://localhost:3000',
  'http://18.136.212.149:8080',
  /^http:\/\/localhost:\d+$/ // regex for any localhost port
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(pattern =>
      typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
    )) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', wordTranslationRoutes);
app.use('/api', favWordRoutes);
app.use('/api/correctionRequests', correctionRequestRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/categories', CategoryRouter);
app.use('/api/wordRequests', WordRequestRouter);
app.use('/api/payments', paymentRoutes);


function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid backend token" });
  }
}

// Upload route using Firebase Storage
app.post('/api/upload-url', async (req, res) => {
  try {
    const fileName = `uploads/${Date.now()}.png`;
    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: 'image/png',
    });

    res.json({
      uploadUrl: url,
      fileUrl: `https://storage.googleapis.com/${bucket.name}/${fileName}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

// Start server
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
