const User = require('../models/User'); 

module.exports = {
    register: async (registerData) => { 
        const { username, email, password, repeatPassword } = registerData; 

        // User exists 
        if (userExistsByEmail(email)) { 
            throw new Error(''); 
        }

        // Passwords do not match 
        if (password !== repeatPassword) { 
            throw new Error('');  
        }

        return User.create({ username, email, password }); 

    }
} 

async function userExistsByEmail(email) {
    const user = await User.findOne({ email: email }); 
    return user !== null; 
}