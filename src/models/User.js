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

// User password hashing 
userSchema.pre('save', async function() { 
    this.password = await bcrypt.hash(this.password, 10); 
}); 

const User = model('User', userSchema); 

module.exports = User; 
