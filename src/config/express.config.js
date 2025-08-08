const express = require('express'); 
const authMiddleware = require('../middlewares/auth.middleware');
const cookieParser = require('cookie-parser');

module.exports = { 
    config: (app) => { 
        app.use(express.static('src/public')); 
        app.use("/", express.static("./node_modules/bootstrap/dist")); 
        app.use(cookieParser()); 
        app.use(authMiddleware.auth()); 
        app.use(express.urlencoded()); 
    }

}; 
