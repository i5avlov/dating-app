const authController = require('express').Router(); 
const { TOKEN } = require('../constants/security.constants');
const guards = require('../middlewares/guards.middlewares');
const authService = require('../services/auth.service'); 
const gendersService = require('../services/genders.service'); 
const citiesService = require('../services/cities.service'); 
const { normalize } = require('../utils/error.utils');
const loginValidator = require('../validators/login.validator');
const registerValidator = require('../validators/register.validator'); 
const cookieParser = require('cookie-parser'); 

authController
    .get('/register', guards.isGuest(), async (req, res) => { 
        const genders = await gendersService.getAll(); 
        const cities = await citiesService.getAll(); 

        res.render('auth/register', { genders, cities }); 
    }) 
    .post('/register', guards.isGuest(), registerValidator.validation(), async (req, res) => { 
        const registerData = req.body; 
        const errors = registerValidator.validate(req); 
            
        try { 
            if (!errors.isEmpty()) { 
                throw errors; 
            } 

            const token = await authService.register(registerData); 
            res.cookie(TOKEN.AUTH_COOKIE_NAME, token); 
            res.redirect('/'); 
        } catch (err) { 
            const genders = await gendersService.getAll(); 
            const cities = await citiesService.getAll(); 

            // console.log(err); 

            return res.render('auth/register', { registerData, genders, cities, errors: normalize(err) }); 
        } 
        
    }); 

authController
    .get('/login', guards.isGuest(), (req, res) => { 
        res.render('auth/login'); 
    }) 
    .post('/login', guards.isGuest(), loginValidator.validation(), async (req, res) => { 
        const loginData = req.body; 
        const errors = loginValidator.validate(req); 
            
        try { 
            if (!errors.isEmpty()) { 
                throw errors; 
            } 

            const token = await authService.login(loginData); 
            res.cookie(TOKEN.AUTH_COOKIE_NAME, token); 
            res.redirect('/'); 
        } catch (err) { 
            return res.render('auth/login', { loginData, errors: normalize(err) }); 
        } 
        
    }); 

authController
    .post('/logout', guards.isAuth(), (req, res) => { 
        res.clearCookie(TOKEN.AUTH_COOKIE_NAME); 
        res.redirect('/'); 
    });

module.exports = authController; 
