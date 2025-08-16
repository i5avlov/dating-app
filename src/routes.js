const routes = require('express').Router(); 
const authController = require('./controllers/auth.controller');
const citiesController = require('./controllers/cities.controller');
const gendersController = require('./controllers/genders.controller');
const homeController = require('./controllers/home.controller'); 
const messagesController = require('./controllers/messages.controller');
const usersController = require('./controllers/users.controller');

routes.use(homeController); 
routes.use('/auth', authController); 
routes.use('/users', usersController); 
routes.use('/messages', messagesController); 
routes.use('/cities', citiesController); 
routes.use('/genders', gendersController); 

module.exports = routes; 
