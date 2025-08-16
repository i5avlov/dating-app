const ValidationError = require("../errors/ValidationError");
const Gender = require("../models/Gender"); 

module.exports = { 
    getAll: () => { 
        return Gender.find({}); 
    }, 

    getById: (genderId) => { 
        return Gender.findById(genderId); 
    }, 

    add: async (genderData) => { 
        const { name, description } = genderData; 

        if (await existsByName(name)) { 
            throw new ValidationError('name', 'Gender already exists'); 
        }

        return Gender.create({ 
            name: name, 
            description: description  
        }); 
    }, 

    update: async (genderId, updateData) => { 
        const { name, description } = updateData; 

        if (await existsByName(name)) { 
            throw new ValidationError('name', 'Gender already exists'); 
        }

        return Gender.findByIdAndUpdate(genderId, {
            name: name, 
            description: description 
        }); 

    }, 

    delete: (genderId) => {

    }, 

}; 

async function existsByName(genderName) { 
    const gender = await Gender.findOne({ name: genderName }); 
    return gender !== null; 
} 
