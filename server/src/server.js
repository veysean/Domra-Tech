// // server/src/server.js
// import 'dotenv/config';
// // import dotenv from 'dotenv'; // <-- Add this import
// // dotenv.config(); // <-- And this config call
import './init.js';
console.log("Attempting to run server...");
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.js'; 
import db from './models/index.js'; 
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js';
import wordTranslationRoutes from './routes/wordTranslationRoutes.js'; 
import passport from './config/passport.config.js';
import session from 'express-session';
import favWordRoutes from './routes/favWordRoutes.js';
import CategoryRouter from './routes/categoryRoutes.js';
import WordRequestRouter from './routes/wordRequestRoutes.js';
import correctionRequestRoutes from './routes/correctionRequestRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// app.use(cors(
//     {
//         origin:[
//             "https://domra-tech.vercel.app",
//             "http://localhost:5173"
//         ],
//         credentials: true
//     }
// ));

// app.use(cors({ origin: "*" }));
const allowedOrigins = [
  "https://domra-tech.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  /^http:\/\/localhost:\d+$/ // This allows ANY local flutter port (e.g. 5500, 62341)
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(pattern => 
      typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
    )) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true
}));
app.use(session({ secret: 'some_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); 
app.use('/api', wordTranslationRoutes);
app.use('/api', favWordRoutes);
app.use('/api/correctionRequests', correctionRequestRoutes)
app.use('/api/payments', paymentRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/categories', CategoryRouter);
app.use('/api/wordRequests',WordRequestRouter);

app.use('/api/categories', CategoryRouter);
app.use('/api/wordRequests',WordRequestRouter);
app.use('/api', wordTranslationRoutes);
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