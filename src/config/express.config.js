const express = require('express'); 

module.exports = { 
    config: (app) => { 
        app.use(express.static('public')); 
        app.use(express.urlencoded()); 
    }

}; 
