//Pull the DB connection from the database file
const mongodb = require('../database/mongodb');
//Pull in the object id from the URL for the getSingle search
const ObjectId = require('mongodb').ObjectId;

const getMovies = async (req, res, next) => {
  //pull all documents from the listed database as there is nothing in the find perimeters
  const result = await mongodb.getDb().db().collection('wishlistMovies').find();
  //Display the results of the search in an array so its readable in chrome
  if (result == null) {
    res.status(500).json(response.error || 'There was an error while adding your movie. Please try again.');
  } else {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }
};

const getMovie = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to find a movie.');
  } else {
    //Interact with the URL to get the object which in this case would be the ID of the Movie
    const dbId = new ObjectId(req.params.id);
    //Pull the results from the table called Movies from the DB called in the mongodb.js file
    const result = await mongodb.getDb().db().collection('wishlistMovies').find({
      _id: dbId
    });
    //change the results to an array so that its more readable
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }
};

const addMovie = async (req, res) => {
  //creates the variable of Movie so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
  const movie = {
    title: req.body.title,
    year: req.body.year,
    runtime: req.body.runtime,
    genre: req.body.genre,
    director: req.body.director,
    actors: req.body.actors,
    plot: req.body.plot,
    posterUrl: req.body.posterUrl
  };
  if (req.body.title != null & req.body.year != null & req.body.runtime != null & req.body.genre != null & req.body.director != null & req.body.actors != null & req.body.plot != null & req.body.posterUrl != null) {
    //adds the Movie to the database using the data from the Movie variable
    const response = await mongodb.getDb().db().collection('wishlistMovies').insertOne(movie);
    //If the response back from the database was acknowledged (request successful) then note as much in the console
    if (response.acknowledged) {
      console.log(`You have successfully added a new movie to the database.`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while adding your movie. Please try again.');
    }
  } else {
    res.status(400).json('Please enter all fields of data then try again.');
    console.log(movie);
  }
};


const updateMovie = async (req, res) => {
  //Interact with the URL to get the object which in this case would be the ID of the movie
  const userId = new ObjectId(req.params.id);
  //creates the variable of movie so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
  const movie = {
    title: req.body.title,
    year: req.body.year,
    runtime: req.body.runtime,
    genre: req.body.genre,
    director: req.body.director,
    actors: req.body.actors,
    plot: req.body.plot,
    posterUrl: req.body.posterUrl
  };
  if (req.body.title != null & req.body.year != null & req.body.runtime != null & req.body.genre != null & req.body.director != null & req.body.actors != null & req.body.plot != null & req.body.posterUrl != null) {
    //replaces the movie data in the database using the data from the movie variable
    const response = await mongodb.getDb().db().collection('wishlistMovies').replaceOne({
      _id: userId
    }, movie);
    //if the response back from the database that there was at least one row deleted, then output a success message to the log and send a status of 204
    if (response.modifiedCount > 0) {
      res.status(204).send();
      console.log(`The update you requested was successful for ID:${userId}`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while updating your movie. Please try again.');
      console.log(response);
    }
  } else {
    res.status(400).json('Please enter all fields of data then try again.');
    console.log(movie);
  }
};

const removeMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to find a movie.');
  } else {
    //Interact with the URL to get the object which in this case would be the ID of the movie
    const userId = new ObjectId(req.params.id);
    //creates the variable of movie so that when we post the data to the database it knows what to update where with the help of bodyparser added in the server page
    const response = await mongodb.getDb().db().collection('wishlistMovies').deleteOne({
      _id: userId
    }, true);
    //if the response back from the database that there was at least one row deleted, then output a success message to the log and send a status of 204
    if (response.deletedCount > 0) {
      res.status(204).send();
      console.log(`The movie with the ID of ${userId} has been deleted.`)
    }
    //If unsuccessful show a server error of 500 and post an error message to the console
    else {
      res.status(500).json(response.error || 'There was an error while deleting your movie. Please try again.');
    }
  }
};

//send the information out to the contracts.js route
module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  removeMovie
};