module.exports = { 
    markOnEqual: (currentOption, targetOption, mark) => { 
        return currentOption === targetOption ? mark : ''; 
    },  

    getOtherUserId: (messagesToGet, senderId, receiverId) => { 
        if (messagesToGet === 'sent') { 
            return receiverId; 
        } 

        if (messagesToGet === 'received') { 
            return senderId; 
        } 

    }, 

    areMessagesSent: (messagesToGet) => { 
        return messagesToGet === 'sent'; 
    },  

    areMessagesReceived: (messagesToGet) => { 
        return messagesToGet === 'received'; 
    }

}; 