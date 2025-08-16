const { TOKEN, PASSWORD } = require('../constants/security.constants'); 
const ValidationError = require('../errors/ValidationError');
const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const userUtils = require('../utils/user.utils'); 


module.exports = {
    register: async (registerData) => { 
        const { 
            username, email, imageUrl, description, dateOfBirth, gender, city, password, repeatPassword 
        } = registerData; 

        // User exists 
        if (await userUtils.userExistsByEmail(email)) { 
            throw new ValidationError('email', 'User exists'); 
        }

        // Passwords do not match 
        if (password !== repeatPassword) { 
            throw new ValidationError('passwords', 'Passwords do not match');  
        } 

        // Hashing password 
        const hashedPassword = await bcrypt.hash(password, PASSWORD.HASH_ROUNDS); 

        const user = await User.create({ 
            username, email, imageUrl, description, dateOfBirth, gender, city, password: hashedPassword 
        }); 

        // Generating authentication  token
        const token = userUtils.generateToken(user); 

        return token; 

    }, 

    login: async (loginData) => { 
        const { email, password } = loginData; 

        // Get user by email 
        const user = await userUtils.getUserByEmail(email); 
        // If user exists, get saved password and compare with posted password 
        const passwordMatch = user !== null && await bcrypt.compare(password, user.password); 

        // No user or password does not match 
        if (user === null || passwordMatch === false) { 
            throw new ValidationError('login', 'Email or password error'); 
        } 

        // Generating authentication token 
        const token = userUtils.generateToken(user); 

        return token; 
    }
}; 
