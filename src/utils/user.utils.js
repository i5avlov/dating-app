const User = require('../models/User'); 
const { TOKEN } = require('../constants/security.constants'); 
const jwt = require('jsonwebtoken'); 

module.exports = {
    userExistsByEmail: async (email) => {
        const user = await User.findOne({ email: email }); 
        return user !== null; 
    },  
    
    getUserByEmail: (email) => {
        return User.findOne({ email: email }); 
    },  
    
    generateToken: (user) => { 
        const payload = {
            id: user._id, 
            username: user.username, 
            photoUrl: user.imageUrl 
        }; 
    
        const token = jwt.sign(payload, TOKEN.SECRET_KEY); 
    
        return token; 
    }
}; 
