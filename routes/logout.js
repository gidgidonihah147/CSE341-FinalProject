const routes = require('express').Router();
const axios = require('axios');

routes.get('/', function(req,res){
        res.clearCookie('phpsessid');
        res.redirect('/');
});

module.exports = routes;