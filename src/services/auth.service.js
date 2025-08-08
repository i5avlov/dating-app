const ValidationError = require('../errors/ValidationError');
const User = require('../models/User'); 

module.exports = {
    register: async (registerData) => { 
        const { username, email, imageUrl, description, password, repeatPassword } = registerData; 

        // User exists 
        if (await userExistsByEmail(email)) { 
            throw new ValidationError('email', 'User exists'); 
        }

        // Passwords do not match 
        if (password !== repeatPassword) { 
            throw new ValidationError('passwords', 'Passwords do not match');  
        }

        return User.create({ username, email, imageUrl, description, password }); 

    }, 

    login: async (loginData) => { 
        const { email, password } = loginData; 

        const user = await getUserByEmail(email); 

        if (user === null || user.password !== password) { 
            throw new ValidationError('login', 'Email or password error'); 
        } 

        return user; 
    }
} 

async function userExistsByEmail(email) {
    const user = await User.findOne({ email: email }); 
    return user !== null; 
} 

function getUserByEmail(email) {
    return User.findOne({ email: email }); 
}