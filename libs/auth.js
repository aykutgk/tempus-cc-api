const { secret } = require('config').get('jwt');
const jwt = require('jsonwebtoken');


const createToken = (payload) => {
    const token = jwt.sign(payload, secret);
    return token;
};

const authenticationMiddleware = (req, res, next) => {

};


const authMiddleware = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    const splitBearerToken = bearerToken.split(' ');

    if (bearerToken && splitBearerToken.length === 2) {
        const token = splitBearerToken[1];
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return next({ message: err.message, code: 'UNAUTHORIZED', status: 401 });
            }
            req.user = {};
            req.user.decoded = decoded;
            return next();
        });
    } else {
        return next({ 'message': 'jwt malformed', code: 'UNAUTHORIZED', status: 401 });
    }
};


module.exports = {
    createToken,
    authMiddleware,
    authenticationMiddleware,
}