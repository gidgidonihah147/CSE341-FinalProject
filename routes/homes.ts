//Pull the express npm files
const routes = require ('express').Router();

//require the Movies controller so we can pull in the needed variables
const controller = require('../controllers/homes.ts');

//If no ID is in the URL then run the .getAll function to pull the whole database
routes.get('/', controller.getHomes);

//If there is an ID in the URL then run the getSingle function to pull a single Home's information.
routes.get('/:id', controller.getHome);

//Allows the user to run the function createMovie and post that data to mongoDB
routes.post('/', controller.addHome);

//Allows the user to run the function updateMovie and update the data that was retrieved from mongoDB
routes.put('/:id', controller.updateHome);

//Allows the user to run the function deleteMovie and delete the Movie entry from mongoDB
routes.delete('/:id', controller.removeHome);

//export out routes
module.exports = routes;
