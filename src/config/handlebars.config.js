const handlebars = require('express-handlebars'); 

module.exports = {
    config: (app) => { 
        app.engine('hbs', handlebars.engine({ extname: 'hbs' })); 
        app.set('view engine', 'hbs'); 
        app.set('views', 'src/views'); 

    }
}; 
