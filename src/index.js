const app = require('express')(); 
const exp = require('./config/express.config');

// Configurations 
exp.config(app); 

app.get('/', (req, res) => { 
    res.send('Express works.'); 
}); 

app.listen(5000, () => console.log('Server listening...')); 
