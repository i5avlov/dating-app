const { PAGINATION, USER_LIKE_POST_RESPONSE_CODE } = require('../constants/users.constants');
const usersService = require('../services/users.service');

const usersController = require('express').Router(); 

usersController 
    .get('/', async (req, res) => { 
        let { pageNumber, usersPerPageCount } = req.query; 
        let paginationData = await usersService.getPaginated(pageNumber, usersPerPageCount); 

        res.render('users/index', { paginationData }); 
    }) 
    .post('/', async (req, res) => { 
        let { usersPerPageCount } = req.body; 
        // let paginationData = await usersService.getPaginated(1, usersPerPageCount); 

        res.redirect(`/users?pageNumber=1&usersPerPageCount=${usersPerPageCount}`); 
    }); 

usersController 
    .get('/:userId/profile', async (req, res) => { 
        const userId = req.params.userId; 
        // const userId = req.user.id; 
        const userData = await usersService.getById(userId)
            .lean();  

        res.render('users/profile', { userData }); 
    });

usersController
    .post('/like', async (req, res) => { 
        const userId = req.user.id; 
        const otherUserId = req.body['user-id']; 

        await usersService.toggleLike(userId, otherUserId); 

        res.sendStatus(USER_LIKE_POST_RESPONSE_CODE); 
        
    }); 

module.exports = usersController; 
