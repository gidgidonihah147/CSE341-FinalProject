const routes = require('express').Router();
const fs = require('fs');

routes.use('/', require('./swagger.ts'));

routes.use('/oauth', require('./oauth.ts'));
routes.use('/oauth-callback', require('./oauth-callback.ts'));
routes.use('/agents', require('./agents.ts'));
routes.use('/homes', require('./homes.ts'));
routes.use('/buyers', require('./buyers.ts'));
routes.use('/closed_deals', require('./closed_deals.ts'));
routes.use('/logout',require('./logout.ts'));


routes.use('/',(req,res)=>{
    const htmlFile= './main/index.html';
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream(htmlFile).pipe(res);
});



module.exports = routes;
