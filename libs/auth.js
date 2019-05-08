const { secret } = require('config').get('jwt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { encryptPassword, isValidPassword } = require('./bcrypt');

// Don't reveal user exists or not to client 
// and just return generic message
const genericAuthenticationError = {
    message: 'Username or password is invalid!',
    code: 'INVALID_USERNAME_PASSWORD',
    status: 401
};
const createToken = (payload) => {
    const token = jwt.sign(payload, secret);
    return token;
};

const authenticationMiddleware = (req, res, next) => {
    const { username, password } = req.body;
    // find user by username and then validatePassword
    User.findOne({
        where: {
            username
        },
        attributes: ['uuid', 'password', 'type']
    }).then(user => {
        if (!user) {
            return next(genericAuthenticationError);
        }
        const hashBuffer = user.get('password');
        const hash = hashBuffer.toString('utf8');

        return Promise.all([
            isValidPassword(password, hash),
            user
        ]);
    }).then(([res, user]) => {
        if (res) {
            const uuid = user.get('uuid');
            const type = user.get('type');
            const token = createToken({ uuid, type });

            req.userAuthData = { token, user: { uuid, type } };
            return next();
        }
        return next(genericAuthenticationError);
    }).catch(err => {
        return next(err);
    });
};

const jwtMiddleware = (req, res, next) => {
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
    jwtMiddleware,
    authenticationMiddleware,
}