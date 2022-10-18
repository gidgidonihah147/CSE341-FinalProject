//Pull the DB connection from the database file
const mongodb = require('../database/mongodb');
//Pull in the object id from the URL for the getSingle search
const ObjectId = require('mongodb').ObjectId;

// get all Closed_Deals
const getClosed_Deals = async (req, res) => {

  const result = await mongodb.getDb().db('homes').collection('Closed_Deals').find();

  if (result == null) {
    res.status(500).json(response.error || 'There was an error while adding your closed deal. Please try again.');
  } else {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }
};



const getClosed_Deal = async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a closed deal.');
  } else {
    const dbId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('homes').collection('Closed_Deals').find({
      _id: dbId
    });
    //change the results to an array so that its more readable
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }
};



const addClosed_Deal = async (req, res) => {
  const Closed_Deal = {
    Home_ID: req.body.Home_ID,
    Buyer_ID: req.body.Buyer_ID,
    Last_Name: req.body.Last_Name,
    Address: req.body.Address,
    Sold_Price: Sold_Price,
    Date_Closed: req.body.Date_Closed,
  };
  if (req.body.Home_ID != null & req.body.Buyer_ID != null & req.body.Last_Name != null & req.body.Address != null & req.body.Sold_Price != null & req.body.Date_Closed != null) {
    const response = await mongodb.getDb().db('homes').collection('Closed_Deals').insertOne(Closed_Deal);
    if (response.insertedCount > 0) {
      res.status(201).json(response.ops[0]);
    } else {
      res.status(500).json(response.error || 'There was an error while adding your closed deal. Please try again.');
    }
  }
    
    const response = await mongodb.getDb().db('homes').collection('Closed_Deals').insertOne(Closed_Deal);

    if (response.acknowledged) {
      res.status(201).json(response);
      console.log(`You have successfully added a new closed deal to the database.`)
    }
 
    else {
      res.status(500).json(response.error || 'There was an error while adding your closed_deal. Please try again.');
    }
  }
  



const updateClosed_Deal = async (req, res) => {
  
  const userId = new ObjectId(req.params.id);
  //creates the variable of movie so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
  const Closed_Deal = {
    Home_ID: req.body.Home_ID,
    Buyer_ID: req.body.Buyer_ID,
    Last_Name: req.body.Last_Name,
    Address: req.body.Address,
    Sold_Price: Sold_Price,
    Date_Closed: req.body.Date_Closed,
  };
  if (req.body.Home_ID != null & req.body.Buyer_ID != null & req.body.Last_Name != null & req.body.Address != null & req.body.Sold_Price != null & req.body.Date_Closed != null) {

    const response = await mongodb.getDb().db('homes').collection('Closed_Deals').replaceOne({
      _id: userId
    }, Closed_Deal);
   
    if (response.modifiedCount > 0) {
      res.status(204).send();
      console.log(`The update you requested was successful for ID:${userId}`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while updating the Closed_ID. Please try again.');
      console.log(response);
    }
  } else {
    res.status(400).json('Please enter all fields of data then try again.');
    console.log(Closed_Deal);
  }
};




const removeClosed_Deal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid closed deal id to find a movie.');
  } else {

    const userId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db('homes').collection('Closed_Deals').deleteOne({_id: userId}, true);
    //if the response back from the database that there was at least one row deleted, then output a success message to the log and send a status of 204
    if (response.deletedCount > 0) {
      res.status(204).send();
      console.log(`The closed_id with the ID of ${userId} has been deleted.`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while deleting the closed_id. Please try again.');
    }
  }
};

//send the information out to the contracts.js route
module.exports = {
  getClosed_Deals,
  getClosed_Deal,
  addClosed_Deal,
  updateClosed_Deal,
  removeClosed_Deal,
};