const { Schema, model, Types } = require('mongoose'); 
const bcrypt = require('bcrypt'); 

const userSchema = new Schema({
    username: String, 
    email: String, 
    imageUrl: String, 
    description: String, 
    gender: String, 
    dateOfBirth: Date, 
    city: String, 
    dateOfJoin: Date, 
    password: String, 
    likesUsers: [{
        type: Types.ObjectId, 
        ref: 'User' 
    }] 
}); 

userSchema.virtual('age').get(function() {
    const now = new Date(Date.now()); 
    const birthdate = new Date(this.dateOfBirth); 

    let age = now.getFullYear() - birthdate.getFullYear(); 
    const yearsAgo = new Date(Date.now()); 
    yearsAgo.setFullYear(now.getFullYear() - age); 
    if (yearsAgo.getMonth() < birthdate.getMonth() 
        || (birthdate.getMonth() === yearsAgo.getMonth() && yearsAgo.getDate() < birthdate.getDate())) { 
            age -= 1; 
    } 

    return age; 
}); 

// userSchema.methods = { 
//     getAge: function() { 
//         const now = new Date(Date.now()); 
//         const birthdate = new Date(this.dateOfBirth); 

//         let age = now.getFullYear() - birthdate.getFullYear(); 
//         const yearsAgo = new Date(Date.now()); 
//         yearsAgo.setFullYear(now.getFullYear() - age); 
//         if (yearsAgo.getMonth() < birthdate.getMonth() 
//             || (birthdate.getMonth() === yearsAgo.getMonth() && yearsAgo.getDate() < birthdate.getDate())) { 
//                 age -= 1; 
//         } 

//         return age; 

//     }

// }; 

const User = model('User', userSchema); 

module.exports = User; 
