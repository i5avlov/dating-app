const { TOKEN } = require("../constants/security.constants"); 
const jwt = require('jsonwebtoken'); 

module.exports = { 
    auth: () => { 
        return (req, res, next) => { 
            const token = req.cookies[TOKEN.AUTH_COOKIE_NAME]; 

            // No token 
            if (token === undefined) { 
                return next(); 
            } 

            try { 
                // Token valid 
                const user = jwt.verify(token, TOKEN.SECRET_KEY); 

                req.user = user; 
                res.locals.user = user; 

                next(); 
            } catch (err) { 
                // Token not valid 
                res.clearCookie(TOKEN.AUTH_COOKIE_NAME); 
                res.redirect('/auth/login'); 
            }

        };  
    }

}; 