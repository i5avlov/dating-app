const { Result } = require("express-validator");
const ValidationError = require("../errors/ValidationError");

module.exports = {
    normalize: (error) => { 
        let errors = {}; 

        if (error instanceof Result) { 
            error.errors.map(e => {
                errors[e.path] = { 
                    message: e.msg 
                }; 
            }); 
        }
        
        if (error instanceof ValidationError) { 
            errors[error.path] = { message: error.message }; 
        } 

        return errors; 

    }
}; 
