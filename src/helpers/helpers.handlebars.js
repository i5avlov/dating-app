module.exports = { 
    markOnEqual: (currentOption, targetOption, mark) => { 
        return currentOption === targetOption ? mark : ''; 
    }, 

    areMessagesSent: (messagesToGet) => { 
        return messagesToGet === 'sent'; 
    },  

    areMessagesReceived: (messagesToGet) => { 
        return messagesToGet === 'received'; 
    }

}; 