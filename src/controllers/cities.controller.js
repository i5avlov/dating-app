const citiesController = require('express').Router(); 
const citiesService = require('../services/cities.service'); 
const cityValidator = require('../validators/city.validator'); 
const errorUtils = require('../utils/error.utils'); 

citiesController
    .get('/add', (req, res) => { 
        res.render('cities/add'); 
    }) 
    .post('/add', cityValidator.validation(), async (req, res) => { 
        const errors = cityValidator.validate(req); 
        const cityData = req.body; 

        try { 
            if (!errors.isEmpty()) { 
                throw errors; 
            } 

            await citiesService.add(cityData); 
            res.redirect('/cities/add'); 
        } catch (err) {  
            console.log(err.name, err.message); 

            return res.render('cities/add', { cityData, errors: errorUtils.normalize(err) }); 
        } 
        
    });  

module.exports = citiesController; 