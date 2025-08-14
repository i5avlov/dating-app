const handlebars = require('express-handlebars'); 
const helpersHandlebars = require('../helpers/helpers.handlebars');

module.exports = {
    config: (app) => { 
        app.engine('hbs', handlebars.engine({ 
            extname: 'hbs', 
            runtimeOptions: { 
                allowProtoPropertiesByDefault: true, 
                allowedProtoMethods: ['getAge'] 
            }, 
            helpers: helpersHandlebars 
        })); 
        app.set('view engine', 'hbs'); 
        app.set('views', 'src/views'); 

    }
}; 
