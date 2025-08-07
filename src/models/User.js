const { Schema, model, Types } = require('mongoose'); 

const userSchema = new Schema({
    username: String, 
    email: String, 
    password: String, 
    likesUsers: [{
        type: Types.ObjectId, 
        ref: 'User' 
    }] 
}); 

const User = model('User', userSchema); 

module.exports = User; 
