const { Schema, model } = require('mongoose'); 

const citySchema = new Schema({
    name: String 
}); 

const City = model('City', citySchema); 

module.exports = City; 