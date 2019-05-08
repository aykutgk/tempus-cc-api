const { User, Patient, Doctor } = require('../db/models');

const { encryptPassword } = require('../libs/bcrypt');

const seedUsers = () => {
    const password = 'tempus';

    return encryptPassword(password).then(hash => {
        console.log('hash1: ', hash);
        const passwordBuff = Buffer.from(hash, 'utf8');
        return Promise.all([
            User.create(
                {
                    name: 'Aykut Gedik Patient',
                    username: 'ayged_patient',
                    password: passwordBuff,
                    email: Buffer.from('ayged_p@gmail.com', 'utf8'),
                }
            ),
            User.create(
                {
                    name: 'Aykut Gedik Patient 2',
                    username: 'ayged_patient2',
                    password: passwordBuff,
                    email: Buffer.from('ayged_p2@gmail.com', 'utf8'),
                }
            ),
            User.create(
                {
                    name: 'Aykut Gedik Doctor',
                    username: 'ayged_doctor',
                    password: passwordBuff,
                    email: Buffer.from('ayged_d@gmail.com', 'utf8'),
                    type: 'doctor'
                }
            )
        ]).then(([pu1, pu2, du1]) => {
            return Promise.all([
                Patient.create({
                    userId: pu1.get('id'),
                    birthDate: moment("19860926", "YYYYMMDD").toISOString()
                }),
                Patient.create({
                    userId: pu2.get('id'),
                    birthDate: moment("19820926", "YYYYMMDD").toISOString()
                }),
                Doctor.create({
                    userId: du1.get('id')
                }),
            ]);
        }).then(([p1, p2, d1]) => {
            res.json('done');
        });

    });
}