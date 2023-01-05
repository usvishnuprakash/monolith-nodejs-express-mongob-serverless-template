const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'API',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from.',
  },
  servers: [
    {
      url: 'http://localhost:4001',
      description: 'Development server',
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
};

const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [`${__dirname}/routes/*.js`],
};
module.exports = swaggerOptions;
