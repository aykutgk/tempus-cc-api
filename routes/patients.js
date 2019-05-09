const express = require('express');
const router = express.Router();

const moment = require('moment');

const { User, Patient, Doctor } = require('../db/models');

const { jwtMiddleware } = require('../libs/auth');


router.put('/me', jwtMiddleware, function (req, res, next) {
    let userId;
    const { uuid, type } = req.user.decoded;
    const {
        email,
        name,
        phoneNumber,
        Patient: {
            birthDateFormatted,
            address, city, state, country, postalCode
        }
    } = req.body;

    User.findOne({
        where: {
            uuid,
        },
        attributes: ['id']
    }).then((user) => {
        if (!user) {
            return next({ status: 500, message: 'User not exists', code: 'USER_NOT_EXISTS' });
        }
        userId = user.get('id');
    }).then(() => {
        return User.update({
            email,
            name,
            phoneNumber,
            updatedAt: moment().toISOString()
        }, { where: { uuid } }).then(() => {
            if (type === 'patient') {
                return Patient.update({
                    birthDate: birthDateFormatted,
                    address, city, state, country, postalCode
                }, { where: { userId } })
            }
        })
    }).then(() => {
        return User.findOne({
            where: {
                uuid,
            },
            include: [
                {
                    model: type === 'doctor' ? Doctor : Patient,
                }
            ],
            attributes: ['id', 'uuid', 'name', 'email', 'phoneNumber', 'username', 'type']
        })
    }).then(user => {
        return res.json(user);
    }).catch(err => {
        return next(err);
    });
});

module.exports = router;
