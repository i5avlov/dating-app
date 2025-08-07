const User = require('../models/User'); 

module.exports = { 
    getAll: () => { 
        return User.find({}); 
    }, 

    getUserIdByEmail: async (email) => { 
        const user = await User.findOne({ email: email }); 
        return user._id; 
    }, 

    toggleLike: async (currentUserId, otherUserId) => { 
        const user = await User.findById(currentUserId); 
        
        if (user.likesUsers.includes(otherUserId)) { 
            user.likesUsers.pull(otherUserId); 
        } else {
            user.likesUsers.push(otherUserId); 
        } 

        await user.save(); 
    }, 

    getLikedUsers: async (userId) => { 
        return await User.findById(userId).select('username likesUsers').populate('likesUsers').lean(); 
    }, 

    // getLikedByUsers: (userId) => { 
    //     return User.find({ likesUsers:  }); 
    // } 
    
}; 
