const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

const { User, Patient, DoctorPatient } = require('../db/models');

const { jwtMiddleware } = require('../libs/auth');


router.get('/patients', jwtMiddleware, (req, res, next) => {
    const { uuid, type } = req.user.decoded;
    const { name } = req.query;

    const where = {
        type: 'patient',
    };

    if (name && name.length > 0) {
        where.name = { [sequelize.Op.iLike]: `%${name}%` };
    }

    User.findOne({ where: { uuid } }).then((user) => {
        if (!user) {
            return next({ status: 500, message: 'User not exist', code: 'USER_NOT_EXIST' })
        }
        return DoctorPatient.findAll({
            where: {
                doctorId: user.get('id'),
            },
            attributes: ['patientId']
        });
    }).then((patientIds) => {
        where.id = { [sequelize.Op.in]: patientIds.map(p => p.get('patientId')) };
        return User.findAll({
            where,
            include: [
                {
                    model: Patient,
                }
            ],
            attributes: ['id', 'uuid', 'name', 'email', 'phoneNumber', 'username', 'type']
        })
    }).then((patients) => {
        return res.json(patients);
    }).catch((err) => {
        console.log(err);
        return next(err);
    })
});

module.exports = router;
