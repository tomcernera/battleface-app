const jwt = require('jsonwebtoken');


module.exports = {
    generateToken: function (username) {
        return jwt.sign(username,  process.env.TOKEN_SECRET);
    },
    authenticateToken: function(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (token == null) return res.sendStatus(401)
        
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) console.log(err);
        
            if (err) return res.sendStatus(403);
        
            req.user = user;
        
            next();
        })
        } catch (error) {
            const payload = {
                error: "Bad Bearer token."
            }
          res.status(500).send(payload);
        }
    }
}