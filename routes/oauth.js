const routes = require('express').Router();
require("dotenv").config();

const client = process.env.github_ClientId;
console.log(client);
routes.get('/',(req,res) =>{
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${client}`
    )
});

module.exports = routes;