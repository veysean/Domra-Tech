import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Domra Tech API',
      version: '1.0.0',
      description: 'API documentation for the Domra Tech technical lexicon.',
      contact: {
        name: 'Your Team',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? `http://${process.env.SERVER_URL}/api`
          : 'http://localhost:8080/api',
        description: process.env.NODE_ENV === 'production'
          ? 'Production server'
          : 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;