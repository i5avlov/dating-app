module.exports = { 
    markOnEqual: (currentOption, targetOption, mark) => { 
        return currentOption?.toString() === targetOption?.toString() ? mark : ''; 
    },  

    slice: (text = '', charCount = 0) => { 
        return text.slice(0, charCount) + '...'; 
    }, 

    capitalize: (text = '') => { 
        return text.charAt(0).toUpperCase() + text.slice(1); 
    }, 

    getList: (start, end) => { 
        let list = []; 

        for (let i = start; i <= end; i++) { 
            list.push(i); 
        } 

        return list; 
    
    }, 

    isNotCurrentUser: (currentUserId, otherUserId) => { 
        if (!currentUserId) { 
            return false; 
        }
        return otherUserId.equals(currentUserId) === false; 
    }, 

    isEqual: (prop, value) => { 
        return prop === value; 

    }, 

    getOtherUserId: (messagesToGet, senderId, receiverId) => { 
        if (messagesToGet === 'sent') { 
            return receiverId; 
        } 

        if (messagesToGet === 'received') { 
            return senderId; 
        } 

    }, 

    getDate: (dateValue) => { 
        const date = new Date(dateValue); 
        const hours = date.getHours(); 
        const minutes = date.getMinutes(); 

        return date.toDateString() + ' ' + hours + ':' + minutes; 
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