const bcrypt = require('bcrypt');
const { saltRounds } = require('config').get('bcrypt');


const encryptPassword = (plainPassword) => {
    return bcrypt.hash(plainPassword, saltRounds)
};

const isValidPassword = (plainPassword, hash) => {
    // res === true or false
    return bcrypt.compare(plainPassword, hash);
};


module.exports = {
    encryptPassword,
    isValidPassword
}