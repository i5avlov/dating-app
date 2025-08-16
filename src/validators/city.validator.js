const validator = require('express-validator'); 

const validation = () => { 
    return [
        validator.body('name') 
            .trim() 
            .isLength({ min: 2 }) 
            .custom(name => name.match(/^[A-Za-z ]+$/)) 
            
    ]; 

}; 

const validate = (req) => { 
    return validator.validationResult(req); 
}; 

module.exports = { 
    validation, 
    validate 
}; 