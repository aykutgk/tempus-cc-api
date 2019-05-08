const express = require('express');
const router = express.Router();

const moment = require('moment'); // moment().toISOString(),

const { User, Patient, Doctor } = require('../db/models');

const { authenticationMiddleware } = require('../libs/auth');


router.post('/sign-in', authenticationMiddleware, function (req, res, next) {
  const { userAuthData } = req;
  res.json(userAuthData);
});

module.exports = router;
