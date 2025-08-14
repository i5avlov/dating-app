const { PAGINATION } = require('../constants/messages.constants');
const messagesController = require('../controllers/messages.controller');
const Message = require('../models/Message'); 
const paginationUtils = require('../utils/pagination.utils');

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

    getMessages: async (messagesToGet, userId, pageNumberValue, messagesPerPageCountValue) => { 
        // Values are parsed when not undefined 
        // and set to default when undefined 
        const pageNumber = pageNumberValue 
            ? Number(pageNumberValue) 
            : PAGINATION.PAGE_NUMBER; 
        const messagesPerPageCount = messagesPerPageCountValue 
            ? Number(messagesPerPageCountValue) 
            : PAGINATION.MESSAGES_PER_PAGE_COUNT; 

        let messages = queryMessagesToGet(messagesToGet, userId) 
            .sort({ sendDate: -1 }); 

        const messagesCount = await queryMessagesToGet(messagesToGet, userId)
            .countDocuments(); 
        const paginatedMessages = paginationUtils.getPaginated(messages, messagesCount, pageNumber, messagesPerPageCount); 

        return paginatedMessages; 

    }, 

    getReceived: (userId) => {

    }, 

    getUnread: (userId) => {

    }, 

    getConversation: (currentUserId, otherUserId) => { 
        const messages = queryConversation(currentUserId, otherUserId); 
        return messages.sort({ sendDate: -1 });  
    }, 

    updateReadDate: (currentUserId, otherUserId) => { 
        let messages = queryConversation(currentUserId, otherUserId); 
        return messages.updateMany({ readDate: undefined }, { readDate: new Date(Date.now()) }); 
    }
    
} 

function queryConversation(currentUserId, otherUserId) {
    return Message.find({
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

}

function queryMessagesToGet(messagesToGet, userId) {
    let messages = Message.find({}); 

    if (messagesToGet === 'sent') { 
        messages = messages.where({ sender: userId }); 
    } 

    if (messagesToGet === 'received') { 
        messages = messages.where({ receiver: userId }); 
    } 

    return messages; 
}
