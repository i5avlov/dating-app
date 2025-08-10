const messagesController = require('../controllers/messages.controller');
const Message = require('../models/Message'); 

module.exports = { 
    add: (messageData, sourceUserId, targetUserId) => { 
        const { message } = messageData; 

        return Message.create({
            content: message, 
            sendDate: Date.now(), 
            sender: sourceUserId, 
            receiver: targetUserId 
        }); 

    }, 

    delete: (messageId) => {

    }, 

    getAll: () => {

    }, 

    getById: (messageId) => {

    }, 

    getSent: (userId) => {

    }, 

    getReceived: (userId) => {

    }, 

    getUnread: (userId) => {

    }, 

    getConversation: (currentUserId, otherUserId) => { 
        const messages = Message.find({
            $or: [ 
                { 
                    $and: [ 
                        { sender: currentUserId }, 
                        { receiver: otherUserId } 
                    ] 
                }, 
                {
                    $and: [ 
                        { sender: otherUserId }, 
                        { receiver: currentUserId } 
                    ] 
                }
            ]
        }); 

        return messages.sort({ sendDate: -1 });  
    }
    
} 
