const User = require('../models/User'); 
const pagination = require('../utils/pagination.utils'); 
const { PAGINATION } = require('../constants/users.constants'); 
const citiesService = require('./cities.service');
const gendersService = require('./genders.service');
const ValidationError = require('../errors/ValidationError'); 
const userUtils = require('../utils/user.utils'); 

module.exports = { 
    getAll: () => { 
        return User.find({}); 
    }, 

    getPaginated: async (userId, query) => { 
        let { pageNumber, usersPerPageCount, ...filter } = query; 
        // Values are parsed when not undefined 
        // and set to default when undefined 
        pageNumber = pageNumber 
            ? Number(pageNumber) 
            : PAGINATION.PAGE_NUMBER; 
        usersPerPageCount = usersPerPageCount 
            ? Number(usersPerPageCount) 
            : PAGINATION.USERS_PER_PAGE_COUNT; 

        let usersQuery = filterUsers(filter); 
        let usersCount = await filterUsers(filter).countDocuments(); 

        if (userId) {
            // Query of all users except current user 
            usersQuery = usersQuery 
                .where('_id')
                .ne(userId); 
            // Get all users count except current user 
            usersCount = usersCount - 1; 
        }

        const paginatedUsers = await pagination.getPaginated(usersQuery, usersCount, pageNumber, usersPerPageCount); 
        // Awaits paginated users query 
        // paginatedUsers.onPageElements = await paginatedUsers.onPageElements; 
        paginatedUsers.onPageElements = await paginatedUsers.onPageElements; 
        // paginatedUsers.onPageElements.forEach(element => {
        //     element.age = element.getAge() ; 
        // }); 

        return paginatedUsers; 
        
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
        return User.findById(userId); 
    }, 

    // getById: async (userId) => { 
    //     let user = await User.findById(userId); 
    //     user.age = user.getAge(); 

    //     return user; 
    // }, 

    // details: (userId) => { 
    //     return User.findById(userId).populate

    // }, 

    update: async (userId, updateData) => { 
        const { username, email, imageUrl, description, dateOfBirth, gender, city } = updateData; 

        // Email exists 
        if (await userUtils.userExistsByEmail(email)) { 
            throw new ValidationError('email', 'User exists'); 
        }

        // City exists not
        if (false === await citiesService.existsByName(city)) { 
            throw new ValidationError('city', 'City does not exist'); 

        } 

        // Gender exists not 
        if (false === await gendersService.existsByName(gender)) { 
            throw new ValidationError('gender', 'Gender does not exist');

        } 

        return User.findByIdAndUpdate(userId, {
            username, email, imageUrl, description, dateOfBirth, gender, city
        }); 

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

function filterUsers(filter = {}) { 
    let query = User.find({}); 

    if (filter.gender) { 
        query = query.where({ gender: filter.gender }); 
    } 

    if (filter.minAge) { 
        const maxDate = getDate(filter.minAge); 
        query = query.where({ dateOfBirth: { $lt: maxDate } }); 
    } 

    if (filter.maxAge) { 
        const minDate = getDate(filter.maxAge); 
        query = query.where({ dateOfBirth: { $gt: minDate } }); 
    } 

    if (filter.city) { 
        query = query.where({ city: filter.city }); 
    } 

    return query; 
} 

function getDate(age) {
    const now = new Date(Date.now()); 
    const yearAgo = now.getFullYear() - Number(age); 
    const dateAgo = new Date(Date.now()); 
    dateAgo.setFullYear(yearAgo, now.getMonth(), now.getDate()); 

    return dateAgo; 
}

function getAllUsersExceptOne(userId) {
    return User.find({})
        .where('_id')
        .ne(userId); 
}

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
