const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = '1234#'; 
const connection = require("../../../db/connection.js");
const authenticateJWT = async (req, res, next) => {

    try {
        
        const authorization = req.header('Authorization');

        if (!authorization) {
            return res.status(401).json({ message: 'Unauthorized. No token provided.' });
        }
        console.log(authorization)
        const decoded =  jwt.verify(authorization,JWT_SECRET_KEY ,  { algorithms: ['HS256'] });
        console.log(decoded)
        
        req.user = decoded.user;
        next();
        
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message:error });
        }
        console.error(error);
        res.status(500).json({ error: 'An internal error occurred while verifying token.' });
    }
};

module.exports = { authenticateJWT, JWT_SECRET_KEY };
