const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment().toISOString(),

const { User } = require('../db/models');

const { createToken } = require('../libs/auth');


router.get('/sign-in', function (req, res, next) {
  const { username, password } = req.body;

  console.log(username, password);

  res.json();

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
