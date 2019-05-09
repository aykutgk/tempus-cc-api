const express = require('express');
const router = express.Router();

const moment = require('moment');

const { User, Patient, Doctor } = require('../db/models');
const { seedUsers } = require('../db/seeders/s1');

const { authenticationMiddleware, jwtMiddleware } = require('../libs/auth');


router.post('/seed', (req, res, next) => {
  seedUsers()
    .then((result) => res.json(result))
    .catch(err => {
      return next(err)
    });
});

router.post('/sign-in', authenticationMiddleware, function (req, res, next) {
  const { userAuthData } = req;
  res.json(userAuthData);
});

router.get('/me', jwtMiddleware, (req, res, next) => {
  const { uuid, type } = req.user.decoded;

  User.findOne({
    where: {
      uuid,
    },
    include: [
      {
        model: type === 'doctor' ? Doctor : Patient,
      }
    ],
    attributes: ['id', 'uuid', 'name', 'email', 'phoneNumber', 'username', 'type']
  }).then(user => {
    return res.json(user);
  }).catch(err => {
    return next(err);
  });
});

module.exports = router;
