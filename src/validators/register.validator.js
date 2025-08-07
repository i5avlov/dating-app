const validator = require('express-validator'); 

const validation = () => { 
    return [
        validator.body('username') 
            .trim() 
            .isLength({ min: 6 }), 
        validator.body('email') 
            .trim() 
            .isEmail(), 
        validator.body('password') 
            .trim() 
            .isLength({ min: 6 }) 

    ]; 

}; 

const validate = (req) => { 
    return validator.validationResult(req); 
}; 

module.exports = { 
    validation, 
    validate 
}; 