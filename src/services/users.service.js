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

    getById: (userId) => { 
        return User.findById(userId).populate('likesUsers'); 
    }, 

    getLikedUsers: (userId) => { 
        return User.findById(userId) 
            .select('likesUsers')
            .populate('likesUsers')
            .select('id username email'); 
    }, 

    getLikedByUsers: (userId) => { 
        return User.find({ likesUsers: { $all: [ userId ] } })
            .select('id username email'); 

    }
    
}; 
