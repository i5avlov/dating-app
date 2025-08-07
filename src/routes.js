const routes = require('express').Router(); 
const authController = require('./controllers/auth.controller');
const homeController = require('./controllers/home.controller'); 
const usersController = require('./controllers/users.controller');

routes.use(homeController); 
routes.use('/auth', authController); 
routes.use('/users', usersController); 

module.exports = routes; 
