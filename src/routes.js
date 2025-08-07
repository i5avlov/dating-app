const routes = require('express').Router(); 
const homeController = require('./controllers/home.controller'); 

routes.use(homeController); 

module.exports = routes; 
