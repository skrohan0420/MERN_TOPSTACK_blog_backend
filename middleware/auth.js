const config = require('../config/config');
const jwt = require('jsonwebtoken');



const authenticateJWT = async (req, res, next) => {
    const authHeader = req.header('authorization');
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({
            status: false,
            message: 'Access denied. No token provided.',
        });
    }
    const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"
    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'Access denied. No token provided.',
        });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    if (!decoded) {
        return res.status(401).json({
            status: false,
            message: 'Invalid token.',
        });
    }

    req.user = decoded;
    console.log('Decoded token:', decoded);
    next();
};



module.exports = {
    authenticateJWT,
};
