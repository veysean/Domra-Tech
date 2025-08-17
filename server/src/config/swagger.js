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
        url: 'http://localhost:3002/api',
        description: 'Local development server',
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
      schemas: {
        WordTranslation: {
          type: 'object',
          required: ['EnglishWord', 'KhmerWord'],
          properties: {
            wordId: {
              type: 'integer',
              example: 1,
            },
            EnglishWord: {
              type: 'string',
              example: 'Hello',
            },
            FrenchWord: {
              type: 'string',
              example: 'Bonjour',
            },
            KhmerWord: {
              type: 'string',
              example: 'សួស្តី',
            },
            definition: {
              type: 'string',
              example: 'A greeting used when meeting someone.',
            },
            example: {
              type: 'string',
              example: 'Hello, how are you?',
            },
            reference: {
              type: 'string',
              example: 'Oxford Dictionary',
            },
            status: {
              type: 'string',
              enum: ['active', 'deleted'],
              example: 'active',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;