const usersService = require('../services/users.service');

const usersController = require('express').Router(); 

usersController 
    .get('/', async (req, res) => { 
        const usersData = await usersService.getAll().lean(); 
        res.render('users/index', { usersData }); 
    });  

usersController
    .post('/like', async (req, res) => { 
        const userId = await usersService.getUserIdByEmail('is@softuni.bg'); 
        const otherUserId = req.body['user-id']; 

        await usersService.toggleLike(userId, otherUserId); 

        res.redirect('/'); 
        
    }); 

module.exports = usersController; 