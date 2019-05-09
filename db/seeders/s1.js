const moment = require('moment');

const { User, Patient, Doctor, DoctorPatient } = require('../models');

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
                    name: 'Aykut Gedik Patient 3',
                    username: 'ayged_patient3',
                    password: passwordBuff,
                    email: 'ayged_p3@gmail.com',
                    phoneNumber: '512-633-2281',
                }
            ),
            User.create(
                {
                    name: 'Aykut Gedik Patient 4',
                    username: 'ayged_patient4',
                    password: passwordBuff,
                    email: 'ayged_p4@gmail.com',
                    phoneNumber: '512-633-2281',
                }
            ),
            User.create(
                {
                    name: 'Aykut Gedik Patient 5',
                    username: 'ayged_patient5',
                    password: passwordBuff,
                    email: 'ayged_p5@gmail.com',
                    phoneNumber: '512-633-2281',
                }
            ),
            User.create(
                {
                    name: 'Aykut Gedik Patient 6',
                    username: 'ayged_patient6',
                    password: passwordBuff,
                    email: 'ayged_p6@gmail.com',
                    phoneNumber: '512-633-2281',
                }
            ),
            User.create(
                {
                    name: 'Aykut Gedik Doctor',
                    username: 'ayged_doctor1',
                    password: passwordBuff,
                    email: 'ayged_d@gmail.com',
                    type: 'doctor',
                    phoneNumber: '512-633-2282',
                }
            ),
            User.create(
                {
                    name: 'Aykut Gedik Doctor2',
                    username: 'ayged_doctor2',
                    password: passwordBuff,
                    email: 'ayged_d2@gmail.com',
                    type: 'doctor',
                    phoneNumber: '512-633-2282',
                }
            )
        ]).then(([pu1, pu2, pu3, pu4, pu5, pu6, du1, du2]) => {
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
                Patient.create({
                    userId: pu3.get('id'),
                    birthDate: moment("19820926", "YYYYMMDD").toISOString(),
                    address: '1219 Williamsburg St.',
                    city: 'Brooklyn',
                    state: 'NY',
                    country: 'USA',
                    postalCode: '94100'
                }),
                Patient.create({
                    userId: pu4.get('id'),
                    birthDate: moment("19820926", "YYYYMMDD").toISOString(),
                    address: '1219 Williamsburg St.',
                    city: 'Brooklyn',
                    state: 'NY',
                    country: 'USA',
                    postalCode: '94100'
                }),
                Patient.create({
                    userId: pu5.get('id'),
                    birthDate: moment("19820926", "YYYYMMDD").toISOString(),
                    address: '1219 Williamsburg St.',
                    city: 'Brooklyn',
                    state: 'NY',
                    country: 'USA',
                    postalCode: '94100'
                }),
                Patient.create({
                    userId: pu6.get('id'),
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
                Doctor.create({
                    userId: du2.get('id')
                }),
            ]);
        }).then(([p1, p2, p3, p4, p5, p6, d1, d2]) => {
            return Promise.all([
                DoctorPatient.create({
                    doctorId: d1.get('userId'),
                    patientId: p1.get('userId')
                }),
                DoctorPatient.create({
                    doctorId: d1.get('userId'),
                    patientId: p2.get('userId')
                }),
                DoctorPatient.create({
                    doctorId: d2.get('userId'),
                    patientId: p3.get('userId')
                }),
                DoctorPatient.create({
                    doctorId: d2.get('userId'),
                    patientId: p4.get('userId')
                }),
                DoctorPatient.create({
                    doctorId: d2.get('userId'),
                    patientId: p5.get('userId')
                }),
                DoctorPatient.create({
                    doctorId: d2.get('userId'),
                    patientId: p6.get('userId')
                }),
            ]);
        }).then(() => {
            return true;
        })
    });
}


module.exports = {
    seedUsers,
}