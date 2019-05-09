const moment = require('moment');

const { User, Patient, Doctor } = require('../models');

const { encryptPassword } = require('../../libs/bcrypt');

const seedUsers = () => {

    const password = 'tempus';

    return encryptPassword(password).then(hash => {
        const passwordBuff = Buffer.from(hash, 'utf8');

        return Promise.all([
            User.create(
                {
                    name: 'Aykut Gedik Patient',
                    username: 'ayged_patient',
                    password: passwordBuff,
                    email: 'ayged_p@gmail.com',
                    phoneNumber: '512-633-2280',
                }
            ),
            User.create(
                {
                    name: 'Aykut Gedik Patient 2',
                    username: 'ayged_patient2',
                    password: passwordBuff,
                    email: 'ayged_p2@gmail.com',
                    phoneNumber: '512-633-2281',
                }
            ),
            User.create(
                {
                    name: 'Aykut Gedik Doctor',
                    username: 'ayged_doctor',
                    password: passwordBuff,
                    email: 'ayged_d@gmail.com',
                    type: 'doctor',
                    phoneNumber: '512-633-2282',
                }
            )
        ]).then(([pu1, pu2, du1]) => {
            return Promise.all([
                Patient.create({
                    userId: pu1.get('id'),
                    birthDate: moment("19860926", "YYYYMMDD").toISOString(),
                    address: '1219 Taylor St.',
                    city: 'SF',
                    state: 'CA',
                    country: 'USA',
                    postalCode: '94100'
                }),
                Patient.create({
                    userId: pu2.get('id'),
                    birthDate: moment("19820926", "YYYYMMDD").toISOString(),
                    address: '1219 Williamsburg St.',
                    city: 'Brooklyn',
                    state: 'NY',
                    country: 'USA',
                    postalCode: '94100'
                }),
                Doctor.create({
                    userId: du1.get('id')
                }),
            ]);
        }).then(([p1, p2, d1]) => {
            return true;
        });
    });
}


module.exports = {
    seedUsers,
}