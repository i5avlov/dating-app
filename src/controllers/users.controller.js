const usersController = require('express').Router(); 
const { PAGINATION, USER_LIKE_POST_RESPONSE_CODE } = require('../constants/users.constants');
const guards = require('../middlewares/guards.middlewares');
const usersService = require('../services/users.service'); 
const gendersService = require('../services/genders.service'); 
const citiesService = require('../services/cities.service'); 

usersController 
    .get('/', async (req, res) => { 
        const userId = req.user?.id; 
        let query = req.query;  
        const { pageNumber, usersPerPageCount, ...filter } = req.query; 

        const genders = await gendersService.getAll(); 
        const cities = await citiesService.getAll(); 

        let paginationData = await usersService.getPaginated(userId, query); 

        res.render('users/index', { paginationData, filter, genders, cities }); 
    }) 
    .post('/', async (req, res) => { 
        let { usersPerPageCount } = req.body; 
        // let paginationData = await usersService.getPaginated(1, usersPerPageCount); 

        res.redirect(`/users?pageNumber=1&usersPerPageCount=${usersPerPageCount}`); 
    }); 

usersController 
    .get('/:userId/profile', guards.isAuth(), async (req, res) => { 
        const userId = req.params.userId; 
        // const userId = req.user.id; 
        const userData = await usersService.getById(userId)
            .populate('likesUsers');  
        // userData.age = userData.getAge(); 

        res.render('users/profile', { userData }); 
    });

usersController
    .post('/like', guards.isAuth(), async (req, res) => { 
        const userId = req.user.id; 
        const otherUserId = req.body['user-id']; 

        await usersService.toggleLike(userId, otherUserId); 

        res.sendStatus(USER_LIKE_POST_RESPONSE_CODE); 
        
    }); 

module.exports = usersController; 
