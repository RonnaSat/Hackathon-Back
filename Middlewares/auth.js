const jwt = require('jsonwebtoken');
const config = process.env;

const vertifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'] || req.body.token || req.query.token;
    if (!token) {
        return res.status(403).send("required token for Auth")
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        req.userInfo = decoded.user
    } catch (err) {
        return res.status(401).send("Incalid Token")
    }
    return next();
}
module.exports = vertifyToken;