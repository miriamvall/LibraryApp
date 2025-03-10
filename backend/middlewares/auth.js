const jwt = require("jsonwebtoken");
var config = require("../config");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.jwt_secret);
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};