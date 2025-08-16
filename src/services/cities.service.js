const ValidationError = require("../errors/ValidationError");
const City = require("../models/City");

module.exports = { 
    getAll: () => { 
        return City.find({}); 
    }, 

    getById: (cityId) => { 
        return City.findById(cityId); 
    }, 

    add: async (cityData) => { 
        const { name } = cityData; 

        if (await existsByName(name)) { 
            throw new ValidationError('name', 'City already exists'); 
        }

        return City.create({ 
            name: name 
        }); 
    }, 

    update: async (cityId, updateData) => { 
        const { name } = updateData; 

        if (await existsByName(name)) { 
            throw new ValidationError('name', 'City already exists'); 
        }

        return City.findByIdAndUpdate(cityId, {
            name: name
        }); 

    }, 

    delete: (cityId) => {

    }, 

}; 

async function existsByName(cityName) { 
    const city = await City.findOne({ name: cityName }); 
    return city !== null; 
} 

function getByName(cityName) { 
    return City.findOne({ name: cityName }); 
} 
