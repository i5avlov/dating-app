module.exports = { 
    isAuth: () => { 
        return (req, res, next) => { 
            if (!req.user) { 
                return res.redirect('/auth/login'); 
            } 

            next(); 

        };  
    }, 

    isGuest: () => { 
        return (req, res, next) => { 
            if (req.user) { 
                return res.status(403).send('You do not have access'); 
            } 

            next(); 
            
        };  
    }

}; 