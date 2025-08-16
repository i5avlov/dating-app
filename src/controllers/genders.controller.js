const gendersController = require('express').Router(); 
const gendersService = require('../services/genders.service'); 
const genderValidator = require('../validators/gender.validator'); 
const errorUtils = require('../utils/error.utils'); 

gendersController
    .get('/add', (req, res) => { 
        res.render('genders/add'); 
    }) 
    .post('/add', genderValidator.validation(), async (req, res) => { 
        const errors = genderValidator.validate(req); 
        const genderData = req.body; 

        try { 
            if (!errors.isEmpty()) { 
                throw errors; 
            } 

            await gendersService.add(genderData); 
            res.redirect('/genders/add'); 
        } catch (err) {  
            console.log(err.name, err.message); 

            return res.render('genders/add', { genderData, errors: errorUtils.normalize(err) }); 
        } 
        
    });  

module.exports = gendersController; 