const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // El token va en el header
        // Hay que mandar Bearer espacio y el token
        const token = req.headers.authorization.split(" ");
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};