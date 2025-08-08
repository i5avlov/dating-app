const usersService = require('../services/users.service');

const usersController = require('express').Router(); 

usersController 
    .get('/', async (req, res) => { 
        const usersData = await usersService.getAll().lean(); 
        res.render('users/index', { usersData }); 
    }); 

usersController 
    .get('/profile', async (req, res) => { 
        // const userId = req.params.userId; 
        const userId = req.user.id; 
        const userData = await usersService.getById(userId).lean(); 
        const likedUsers = await usersService.getLikedUsers(userId).lean(); 
        const likedByUsers = await usersService.getLikedByUsers(userId).lean(); 

        res.render('users/profile', { userData, likedUsers: likedUsers.likesUsers, likedByUsers }); 
    });

usersController
    .post('/like', async (req, res) => { 
        const userId = req.user.id; 
        const otherUserId = req.body['user-id']; 

        await usersService.toggleLike(userId, otherUserId); 

        res.redirect('/'); 
        
    }); 

module.exports = usersController; 
