const app = require('express')(); 
const exp = require('./config/express.config');
const hbs = require('./config/handlebars.config');
const mngs = require('./config/mongoose.config');
const routes = require('./routes');

// Configurations 
exp.config(app); 
hbs.config(app); 
mngs.config(); 

// Routes 
app.use(routes); 

app.listen(5000, () => console.log('Server listening...')); 
