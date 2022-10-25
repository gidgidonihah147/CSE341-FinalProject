//Pull the express npm files
const routes = require ('express').Router();


const controller = require('../controllers/closed_deals.ts');


routes.get('/', controller.getClosed_Deals);


routes.get('/:id', controller.getClosed_Deal);

routes.post('/', controller.addClosed_Deal);

routes.put('/:id', controller.updateClosed_Deal);

routes.delete('/:id', controller.removeClosed_Deal);

//export out routes
module.exports = routes;
