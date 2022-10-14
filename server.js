const express = require('express')
const mongodb = require('./database/mongodb');
const bodyParser = require('body-parser');


const app = express()
const port = 3000

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

//run the initDb function on the mongodb when the server starts so that it can populate the data needed.
mongodb.initDb((err, mongodb) => {
      //pulls in the port to the express data
      app.listen(port);
      //outputs an error if there is one while connecting to the database
      console.log(`Error: ${err}`);
      //outputs the current port in use to the log & lets the server know the initDB was run correctly.
      console.log(`Connected to Mongo DB and available on port:${port}`);
  });
