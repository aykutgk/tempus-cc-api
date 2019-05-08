const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment().toISOString(),

const { User, Patient, Doctor } = require('../db/models');

const { encryptPassword } = require('../libs/bcrypt');
const { authenticationMiddleware } = require('../libs/auth');


router.post('/seed', (req, res, next) => {
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
    }).catch(err => {
      console.log(err);
      return next(err);
    })

  });
});

router.post('/sign-in', authenticationMiddleware, function (req, res, next) {
  const { userAuthData } = req;
  res.json(userAuthData);
});


// router.get('/', function (req, res, next) {
//   User.findAll({
//     where: {},
//     order: [['createdAt', 'ASC']],
//     attributes: ['id', 'uuid', 'fullname', 'email']
//   }).then(users => {
//     res.json({ data: users });
//   }).catch((err) => {
//     return next(err);
//   })
// });

// router.get('/:userId', (req, res, next) => {
//   const { userId } = req.params;

//   User.findOne({
//     where: {
//       id: userId
//     },
//     attributes: ['id', 'uuid', 'fullname', ' email']
//   }).then(user => {
//     return res.json({ data: user });
//   }).catch(err => {
//     return next(err);
//   });
// });

// router.post('/', (req, res, next) => {
//   const { email, password, fullname, payload } = req.body;

//   // TODO: have one way encyription by using AWS KMS
//   // https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings
//   const passBuff = Buffer.from(password, 'utf8');

//   User.create(
//     {
//       email,
//       password: passBuff,
//       fullname,
//       payload: {}
//     }
//   ).then((user) => {
//     const token = createToken({ uuid: user.get('uuid') });
//     res.json({ token, user });
//   }).catch((err) => {
//     return next(err);
//   })
// });

module.exports = router;
