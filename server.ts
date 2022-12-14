const express = require('express')
const mongodb = require('./database/mongodb.ts');
const bodyParser = require('body-parser');
const session = require('express-session');



const app = express()
const port = 3000



app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes/index.ts'));


mongodb.initDb((err, mongodb) => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port);
    console.log(`Server running and available on port:${port}`);
    console.log(`Mongo DB Connection Error: ${err}`);  }
});

// //run the initDb function on the mongodb when the server starts so that it can populate the data needed.
// mongodb.initDb((err, mongodb) => {
//       //pulls in the port to the express data
//       app.listen(port);
//       //outputs the current port in use to the log & lets the server know the initDB was run correctly.
//       console.log(`Server running and available on port:${port}`);
//       //outputs an error if there is one while connecting to the database
//       console.log(`Mongo DB Connection Error: ${err}`);
//   });

  module.exports = app
