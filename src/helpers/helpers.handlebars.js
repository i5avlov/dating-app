module.exports = { 
    markOnEqual: (currentOption, targetOption, mark) => { 
        return currentOption === targetOption ? mark : ''; 
    }, 

    slice: (text = '', charCount = 0) => { 
        return text.slice(0, charCount) + '...'; 
    }, 

    getOtherUserId: (messagesGroup, senderId, receiverId) => { 
        if (messagesGroup === 'sent') { 
            return receiverId; 
        } 

        if (messagesGroup === 'received') { 
            return senderId; 
        } 

    }, 

    areMessagesSent: (messagesGroup = '') => { 
        return messagesGroup === 'sent'; 
    }, 

    areMessagesReceived: (messagesGroup = '') => { 
        return messagesGroup === 'received'; 
    }

}; 