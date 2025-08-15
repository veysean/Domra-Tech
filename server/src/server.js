// server/src/server.js

console.log("Attempting to run server...");

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.js'; 
import db from './models/index.js'; 
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js';
import wordTranslationRoutes from './routes/wordTranslationRoutes.js'; 
import passport from './config/passport.config.js';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Correct order: Passport must be configured before the routes
// app.use(session({ secret: 'some_secret_key', resave: false, saveUninitialized: false, 
// cookie: {
//     maxAge: null, // session cookie
//   },
//  }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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