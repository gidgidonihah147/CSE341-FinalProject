const routes = require('express').Router();

routes.use('/movies', require('./movies'))
routes.use('/wishlist', require('./wishlist'))
routes.use('/swagger', require('./swagger'));
routes.use('/',(req, res) => {
    res.sendFile(path.join(__dirname,'../index.html'));
});



module.exports = routes;