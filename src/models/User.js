const { Schema, model, Types } = require('mongoose'); 
const bcrypt = require('bcrypt'); 

const userSchema = new Schema({
    username: String, 
    email: String, 
    imageUrl: String, 
    description: String, 
    password: String, 
    likesUsers: [{
        type: Types.ObjectId, 
        ref: 'User' 
    }] 
}); 

const User = model('User', userSchema); 

module.exports = User; 
