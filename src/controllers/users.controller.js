const { PAGINATION, USER_LIKE_POST_RESPONSE_CODE } = require('../constants/users.constants');
const usersService = require('../services/users.service');

const usersController = require('express').Router(); 

usersController 
    .get('/', async (req, res) => { 
        let query = req.query; 
        const { pageNumber, usersPerPageCount, ...filter } = req.query; 
        const genders = ['male', 'female']; 
        const cities = ['Sofia', 'Plovdiv', 'Bourgas']; 
        const userId = req.user?.id; 
        let paginationData = await usersService.getPaginated(userId, query); 

        res.render('users/index', { paginationData, filter, genders, cities }); 
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
        const userData = await usersService.getById(userId);  

        res.render('users/profile', { userData, age: userData.getAge() }); 
    });

usersController
    .post('/like', async (req, res) => { 
        const userId = req.user.id; 
        const otherUserId = req.body['user-id']; 

        await usersService.toggleLike(userId, otherUserId); 

        res.sendStatus(USER_LIKE_POST_RESPONSE_CODE); 
        
    }); 

module.exports = usersController; 
