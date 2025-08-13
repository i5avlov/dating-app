module.exports = { 
    markOnEqual: (currentOption, targetOption, mark) => { 
        return currentOption === targetOption ? mark : ''; 
    },  

    slice: (text = '', charCount = 0) => { 
        return text.slice(0, charCount) + '...'; 
    }, 

    getPagesList: (pagesCount) => { 
        let list = []; 

        for (let i = 0; i < pagesCount; i++) {
            list.push(i + 1); 
        } 

        return list; 
    
    }, 

    isNotCurrentUser: (currentUserId, otherUserId) => { 
        return otherUserId.equals(currentUserId) === false; 
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
    }, 

    sentByCurrentUser: (currentUserId, senderId) => { 
        return senderId.equals(currentUserId); 

    }

}; 