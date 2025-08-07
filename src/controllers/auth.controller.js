const authService = require('../services/auth.service'); 
const { normalize } = require('../utils/error.utils');
const registerValidator = require('../validators/register.validator');

const authController = require('express').Router(); 

authController
    .get('/register', (req, res) => { 
        res.render('auth/register'); 
    }) 
    .post('/register', registerValidator.validation(), async (req, res) => { 
        const registerData = req.body; 
        const errors = registerValidator.validate(req); 
            
        try { 
            if (!errors.isEmpty()) { 
                throw errors; 
            } 
            await authService.register(registerData); 
        } catch (err) { 
            // console.log(err); 
            return res.render('auth/register', { registerData, errors: normalize(err) }); 
        }

        res.redirect('/'); 
        
    });

module.exports = authController; 
