const app = require('express')(); 
const exp = require('./config/express.config');
const hbs = require('./config/handlebars.config');

// Configurations 
exp.config(app); 
hbs.config(app); 

app.get('/', (req, res) => { 
    res.render('home'); 
}); 

app.listen(5000, () => console.log('Server listening...')); 
