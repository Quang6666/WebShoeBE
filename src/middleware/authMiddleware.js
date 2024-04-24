const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    const tokenHeader = req.headers.token;
    if (!tokenHeader) {
        return res.status(401).json({
            message: 'Token is missing',
            status: 'ERROR'
        });
    }
    const token = tokenHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'Authentication failed',
                status: 'ERROR'
            });
        }
        if (user?.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: 'Access denied',
                status: 'ERROR'
            });
        }
    });
};

module.exports = {
    authMiddleWare
};
