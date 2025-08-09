const { Schema, model, Types } = require('mongoose'); 

const messageSchema = new Schema({
    content: String, 
    sendDate: Date, 
    readDate: Date, 
    sender: {
        type: Types.ObjectId, 
        ref: 'User' 
    }, 
    receiver: {
        type: Types.ObjectId, 
        ref: 'User' 
    } 
}); 

const Message = model('Message', messageSchema); 

module.exports = Message; 
