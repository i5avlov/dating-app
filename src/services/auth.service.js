const ValidationError = require('../errors/ValidationError');
const User = require('../models/User'); 

module.exports = {
    register: async (registerData) => { 
        const { username, email, password, repeatPassword } = registerData; 

        // User exists 
        if (await userExistsByEmail(email)) { 
            throw new ValidationError('email', 'User exists'); 
        }

        // Passwords do not match 
        if (password !== repeatPassword) { 
            throw new ValidationError('passwords', 'Passwords do not match');  
        }

        return User.create({ username, email, password }); 

    }
} 

async function userExistsByEmail(email) {
    const user = await User.findOne({ email: email }); 
    return user !== null; 
}