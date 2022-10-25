//Pull the express npm files
const routes = require ('express').Router();

//require the Movies controller so we can pull in the needed variables
const controller = require('../controllers/agents.ts');

//If no ID is in the URL then run the .getAll function to pull the whole database
routes.get('/', controller.getAgents);

//If there is an ID in the URL then run the getSingle function to pull a single Agent's information.
routes.get('/:id', controller.getAgent);

//Allows the user to run the function createMovie and post that data to mongoDB
routes.post('/', controller.addAgent);

//Allows the user to run the function updateMovie and update the data that was retrieved from mongoDB
routes.put('/:id', controller.updateAgent);

//Allows the user to run the function deleteMovie and delete the Movie entry from mongoDB
routes.delete('/:id', controller.removeAgent);

//export out routes
module.exports = routes;
