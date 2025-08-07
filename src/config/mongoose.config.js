const mongoose = require('mongoose'); 

const dbUrl = 'mongodb://localhost:27017'; 
const dbName = 'dating_app_db'; 

module.exports = {
    config: () => { 
        try { 
            mongoose.connect(dbUrl, { dbName: dbName })
                .then(() => console.log('DB connection established')); 
        } catch (err) { 
            console.log('DB connection error: ', err.message);  
        }
    }
}; 
