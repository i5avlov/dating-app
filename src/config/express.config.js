const express = require('express'); 

module.exports = { 
    config: (app) => { 
        app.use(express.static('src/public')); 
        app.use("/", express.static("./node_modules/bootstrap/dist")); 
        app.use(express.urlencoded()); 
    }

}; 
