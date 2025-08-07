class ValidationError extends Error { 
    constructor(path, message) {
        super(message); 
        this.name = 'ValidationError'; 
        this.path = path; 
    }

}

module.exports = ValidationError; 
