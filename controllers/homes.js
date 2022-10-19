//Pull the DB connection from the database file
const mongodb = require('../database/mongodb');
//Pull in the object id from the URL for the getSingle search
const ObjectId = require('mongodb').ObjectId;

// get all Homes
const getHomes = async (req, res) => {
  // #swagger.description = 'Get a list of all Homes'
  //pull all documents from the listed database(homes) as there is nothing in the find perimeters
  const result = await mongodb.getDb().db('homes').collection('Homes').find();

  //Display the results of the search in an array so its readable in chrome
  if (result == null) {
    res.status(500).json(response.error || 'There was an error while adding your Home. Please try again.');
  } else {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }
};


//Get single Home
const getHome = async (req, res) => {
  // #swagger.description = 'Get a single Home based on its ID'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find an Home.');
  } else {
    //Interact with the URL to get the object which in this case would be the ID of the Home
    const dbId = new ObjectId(req.params.id);
    //Pull the results from the table called Homes from the DB called in the mongodb.js file
    const result = await mongodb.getDb().db('homes').collection('Homes').find({
      _id: dbId
    });
    //change the results to an array so that its more readable
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }
};


//Add an Home
const addHome = async (req, res) => {
  // #swagger.description = 'Add an Home to the list'
  //creates the variable of Movie so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
  const Home = {
    Home_ID: req.body.Home_ID,
    Address: req.body.Address,
    Price: req.body.Price,
    Agent: req.body.Agent,
    Date_Posted: req.body.Date_Posted
  };
  if (req.body.Home_ID != null & req.body.Address != null & req.body.Price != null & req.body.Agent != null & req.body.Date_Posted != null) {
    //adds the Movie to the database using the data from the Movie variable
    const response = await mongodb.getDb().db('homes').collection('Homes').insertOne(Home);
    //If the response back from the database was acknowledged (request successful) then note as much in the console
    if (response.acknowledged) {
      res.status(201).json(response);
      console.log(`You have successfully added a new Home to the database.`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while adding your movie. Please try again.');
    }
  } else {
    res.status(400).json('Please enter all fields of data then try again.');
    console.log(Home);
  }
};

//Modify an Home based on its ID
const updateHome = async (req, res) => {
  // #swagger.description = 'Modify the information of an Home based on its ID'
  //Interact with the URL to get the object which in this case would be the ID of the Home
  const userId = new ObjectId(req.params.id);
  //creates the variable of movie so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
  const Home = {
    Home_ID: req.body.Home_ID,
    Address: req.body.Address,
    Price: req.body.Price,
    Agent: req.body.Agent,
    Date_Posted: req.body.Date_Posted
  };
  if (req.body.Home_ID != null & req.body.Address != null & req.body.Price != null & req.body.Agent != null & req.body.Date_Posted != null) {
    //replaces the movie data in the database using the data from the movie variable
    const response = await mongodb.getDb().db('homes').collection('Homes').replaceOne({
      _id: userId
    }, Home);
    //if the response back from the database that there was at least one row deleted, then output a success message to the log and send a status of 204
    if (response.modifiedCount > 0) {
      res.status(204).send();
      console.log(`The update you requested was successful for ID:${userId}`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while updating the Home. Please try again.');
      console.log(response);
    }
  } else {
    res.status(400).json('Please enter all fields of data then try again.');
    console.log(Home);
  }
};




const removeHome = async (req, res) => {
    // #swagger.description = 'Delete an Home based on its ID'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Home id to find a movie.');
  } else {
    //Interact with the URL to get the object which in this case would be the ID of the Home
    const userId = new ObjectId(req.params.id);
    //creates the variable of Home so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
    const response = await mongodb.getDb().db('homes').collection('Homes').deleteOne({_id: userId}, true);
    //if the response back from the database that there was at least one row deleted, then output a success message to the log and send a status of 204
    if (response.deletedCount > 0) {
      res.status(204).send();
      console.log(`The Home with the ID of ${userId} has been deleted.`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while deleting the Home. Please try again.');
    }
  }
};

//send the information out to the contracts.js route
module.exports = {
  getHomes,
  getHome,
  addHome,
  updateHome,
  removeHome
};