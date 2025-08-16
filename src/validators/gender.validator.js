const validator = require('express-validator'); 

const validation = () => { 
    return [
        validator.body('name') 
            .trim() 
            .isLength({ min: 3 })
            .isAlpha(), 
        validator.body('description') 
            .trim() 
            
    ]; 

}; 

const validate = (req) => { 
    return validator.validationResult(req); 
}; 

module.exports = { 
    validation, 
    validate 
}; 