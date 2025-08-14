import swaggerJSDoc from 'swagger-jsdoc';

// This file sets up the basic API information and tells the tool to look for 
// documentation comments in all .js files within your server/routes directory.
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
      servers: ['http://localhost:3001']
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;