const { Schema, model } = require('mongoose'); 

const genderSchema = new Schema({
    name: String, 
    description: String  
}); 

const Gender = model('gender', genderSchema); 

module.exports = Gender; 