//Pull the DB connection from the database file
const mongodb = require('../database/mongodb');
//Pull in the object id from the URL for the getSingle search
const ObjectId = require('mongodb').ObjectId;

// get all agents
const getAgents = async (req, res) => {
  // #swagger.description = 'Get a list of all Agents'
  //pull all documents from the listed database(homes) as there is nothing in the find perimeters
  const result = await mongodb.getDb().db('homes').collection('Agents').find();

  //Display the results of the search in an array so its readable in chrome
  if (result == null) {
    res.status(500).json(response.error || 'There was an error while adding your agent. Please try again.');
  } else {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }
};


//Get single Agent
const getAgent = async (req, res) => {
  // #swagger.description = 'Get a single Agent based on its ID'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find an agent.');
  } else {
    //Interact with the URL to get the object which in this case would be the ID of the Agent
    const dbId = new ObjectId(req.params.id);
    //Pull the results from the table called Agents from the DB called in the mongodb.js file
    const result = await mongodb.getDb().db('homes').collection('Agents').find({
      _id: dbId
    });
    //change the results to an array so that its more readable
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }
};


//Add an Agent
const addAgent = async (req, res) => {
  // #swagger.description = 'Add an agent to the list'
  //creates the variable of Movie so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
  const agent = {
    Agent_ID: req.body.Agent_ID,
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Date_Hired: req.body.Date_Hired,
    Position: req.body.Position
  };
  if (req.body.Agent_ID != null & req.body.First_Name != null & req.body.Last_Name != null & req.body.Email != null & req.body.Phone != null & req.body.Date_Hired != null & req.body.Position != null) {
    //adds the Movie to the database using the data from the Movie variable
    const response = await mongodb.getDb().db('homes').collection('Agents').insertOne(agent);
    //If the response back from the database was acknowledged (request successful) then note as much in the console
    if (response.acknowledged) {
      res.status(201).json(response);
      console.log(`You have successfully added a new agent to the database.`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while adding your movie. Please try again.');
    }
  } else {
    res.status(400).json('Please enter all fields of data then try again.');
    console.log(agent);
  }
};

//Modify an Agent based on its ID
const updateAgent = async (req, res) => {
  // #swagger.description = 'Modify the information of an Agent based on its ID'
  //Interact with the URL to get the object which in this case would be the ID of the agent
  const userId = new ObjectId(req.params.id);
  //creates the variable of movie so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
  const agent = {
    Agent_ID: req.body.Agent_ID,
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Date_Hired: req.body.Date_Hired,
    Position: req.body.Position
  };
  if (req.body.Agent_ID != null & req.body.First_Name != null & req.body.Last_Name != null & req.body.Email != null & req.body.Phone != null & req.body.Date_Hired != null & req.body.Position != null) {
    //replaces the movie data in the database using the data from the movie variable
    const response = await mongodb.getDb().db('homes').collection('Agents').replaceOne({
      _id: userId
    }, agent);
    //if the response back from the database that there was at least one row deleted, then output a success message to the log and send a status of 204
    if (response.modifiedCount > 0) {
      res.status(204).send();
      console.log(`The update you requested was successful for ID:${userId}`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while updating the Agent. Please try again.');
      console.log(response);
    }
  } else {
    res.status(400).json('Please enter all fields of data then try again.');
    console.log(agent);
  }
};




const removeAgent = async (req, res) => {
    // #swagger.description = 'Delete an Agent based on its ID'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid agent id to find a movie.');
  } else {
    //Interact with the URL to get the object which in this case would be the ID of the agent
    const userId = new ObjectId(req.params.id);
    //creates the variable of agent so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
    const response = await mongodb.getDb().db('homes').collection('Agents').deleteOne({_id: userId}, true);
    //if the response back from the database that there was at least one row deleted, then output a success message to the log and send a status of 204
    if (response.deletedCount > 0) {
      res.status(204).send();
      console.log(`The agent with the ID of ${userId} has been deleted.`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while deleting the agent. Please try again.');
    }
  }
};

//send the information out to the contracts.js route
module.exports = {
  getAgents,
  getAgent,
  addAgent,
  updateAgent,
  removeAgent
};