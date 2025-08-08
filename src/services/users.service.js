const User = require('../models/User'); 
const { PAGINATION } = require('../constants/users.constants'); 

module.exports = { 
    getAll: () => { 
        return User.find({}); 
    }, 

    getPaginated: async (pageNumberValue, usersPerPageCountValue) => { 
        const pageNumber = pageNumberValue 
            ? Number(pageNumberValue) 
            : PAGINATION.PAGE_NUMBER; 
        const usersPerPageCount = usersPerPageCountValue 
            ? Number(usersPerPageCountValue) 
            : PAGINATION.USERS_PER_PAGE_COUNT; 

        const pagesToSkip = pageNumber - 1; 
        const pagesCount = await getPagesCount(usersPerPageCount); 

        return { 
            onPageUsers: await User.find({}) 
                .skip(pagesToSkip * usersPerPageCount)
                .limit(usersPerPageCount)
                .lean(), 
            pageNumber, 
            usersPerPageCount, 
            pagesList: getPagesList(pagesCount), 
            usersPerPageOptions: PAGINATION.USERS_PER_PAGE_OPTIONS 
        }; 
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

async function getPagesCount(usersPerPageCount) { 
    const allUsersCount = await User.find({}).countDocuments(); 
    const pagesCount = Math.ceil(allUsersCount / usersPerPageCount); 

    return pagesCount; 
} 

function getPagesList(pagesCount) { 
    let list = []; 

    for (let i = 0; i < pagesCount; i++) {
        list.push(i + 1); 
    } 

    return list; 
    
}
