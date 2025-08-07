const app = require('express')(); 
const exp = require('./config/express.config');
const hbs = require('./config/handlebars.config');
const routes = require('./routes');

// Configurations 
exp.config(app); 
hbs.config(app); 

// Routes 
app.use(routes); 

app.listen(5000, () => console.log('Server listening...')); 
