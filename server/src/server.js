// 1. MUST BE LINE 1: Load environment variables immediately
import 'dotenv/config'; 

// 2. Load core modules
import express from 'express';
import cors from 'cors';
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
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Attempting to run server...");
console.log("Checking DB User:", process.env.DB_USER); // Debug line to verify loading

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
  "http://18.136.212.149:8080", //server ip
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

        app.listen(PORT, '0.0.0.0', () => { // Adding '0.0.0.0' helps AWS bind correctly
            console.log(`Server is running on port ${PORT}`);
            console.log(`Swagger docs available at http://18.136.212.149:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();