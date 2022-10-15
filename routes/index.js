const routes = require('express').Router();
const fs = require('fs');

routes.use('/', require('./swagger'));

routes.use('/oauth', require('./oauth'));
routes.use('/oauth-callback', require('./oauth-callback'));
routes.use('/movies', require('./movies'));
routes.use('/wishlist', require('./wishlist'));
routes.use('/',(req,res)=>{
    const htmlFile= './main/index.html';
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream(htmlFile).pipe(res);
});





module.exports = routes;