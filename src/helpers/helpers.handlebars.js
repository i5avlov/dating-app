module.exports = { 
    markOnEqual: (currentOption, targetOption, mark) => { 
        return currentOption === targetOption ? mark : ''; 
    }

}; 