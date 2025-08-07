const authService = require('../services/auth.service');

const authController = require('express').Router(); 

authController
    .get('/register', (req, res) => { 
        res.render('auth/register'); 
    }) 
    .post('/register', async (req, res) => { 
        const registerData = req.body; 

        try { 
            await authService.register(registerData); 
        } catch (err) { 
            res.render('auth/register', { registerData, errors: err }); 
        }

        res.redirect('/'); 
        
    });

module.exports = authController; 
