//pulls in the node mongodb files
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');
//pulls in the .env environment file so we can hide the sensitive information
require("dotenv").config();

//Create a variable to assign the database to once its initialized
let _db;

//populates the _db variable with the DB data, also throws an error out if its unable to connect.
const initDb = (callback) => {
  //if there is data in the database function, send notice to the log that there is data, and just return the data back.
  if (_db) {
    console.log('The Database data is already populated');
    return callback(null, _db);
  }
  //Attempts connection to the DB through the .env data
  MongoClient.connect(process.env.MONGODB_URI)
    //if it connects without error then goes into effect
    .then((client) => {
      //applies the database data to _db for easier use
      _db = client;
      //applies the data to the callback so it can return to the server
      callback(null, _db);
    })
    //if there is an error, it returns the error to the callback to the server
    .catch((err) => {
      callback(err);
    });
};

//Function pulls the DB data. If it is null then it throws an error that there is a blank BD
const getDb = () => {
  if (!_db) {
    throw Error('There is no data in the database or the database connection isnt active');
  }
  return _db;
};

//exports the functions that were created.
module.exports = {
  initDb,
  getDb,
};