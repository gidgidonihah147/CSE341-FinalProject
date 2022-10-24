const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE341-Project2',
        description: 'Swagger API Documentation for the final projec'
    },
    host: 'homesforsalenow.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
