const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library API',
    description: 'REST API for managing a library — books and authors collections.',
  },
  host: 'cse341-librarymanager.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/books.js', './routes/authors.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);