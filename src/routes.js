const routes = require('express').Router(); 
const authController = require('./controllers/auth.controller');
const homeController = require('./controllers/home.controller'); 

routes.use(homeController); 
routes.use('/auth', authController); 

module.exports = routes; 
