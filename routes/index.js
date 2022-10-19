const routes = require('express').Router();
const fs = require('fs');

routes.use('/', require('./swagger'));
routes.use('/',(req,res)=>{
    const htmlFile= './main/index.html';
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream(htmlFile).pipe(res);
});
//routes.use('/oauth', require('./oauth'));
//routes.use('/oauth-callback', require('./oauth-callback'));
routes.use('/agents', require('./agents'));
routes.use('/closed_deals', require('./closed_deals'));


module.exports = routes;