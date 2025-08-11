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

    getMessages: (messagesToGet, userId) => { 
        let messages = Message.find({}); 

        if (messagesToGet === 'sent') { 
            messages = messages.where({ sender: userId }); 
        } 

        if (messagesToGet === 'received') { 
            messages = messages.where({ receiver: userId }); 
        } 

        return messages.sort({ sendDate: -1 }); 

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
