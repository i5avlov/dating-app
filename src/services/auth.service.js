const { TOKEN } = require('../constants/security.constants'); 
const ValidationError = require('../errors/ValidationError');
const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 


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

        const user = await User.create({ username, email, imageUrl, description, password }); 

        // Generating authentication  token
        const token = generateToken(user); 

        return token; 

    }, 

    login: async (loginData) => { 
        const { email, password } = loginData; 

        // Get user by email 
        const user = await getUserByEmail(email); 
        // If user exists, get saved password and compare with posted password 
        const passwordMatch = user !== null && await bcrypt.compare(password, user.password); 

        // No user or password does not match 
        if (user === null || passwordMatch === false) { 
            throw new ValidationError('login', 'Email or password error'); 
        } 

        // Generating authentication token 
        const token = generateToken(user); 

        return token; 
    }
} 

async function userExistsByEmail(email) {
    const user = await User.findOne({ email: email }); 
    return user !== null; 
} 

function getUserByEmail(email) {
    return User.findOne({ email: email }); 
} 

function generateToken(user) { 
    const payload = {
        id: user._id, 
        username: user.username, 
        photoUrl: user.imageUrl 
    }; 

    const token = jwt.sign(payload, TOKEN.SECRET_KEY); 

    return token; 
}