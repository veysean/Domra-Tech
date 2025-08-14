// server/src/server.js

console.log("Attempting to run server...");

import express from 'express';
import { Sequelize } from 'sequelize';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.js'; 
import dbConfig from './config/db.config.js';
import db from './models/index.js'; 
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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