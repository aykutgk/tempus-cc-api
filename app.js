const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const db = require('./libs/db');

const createError = require('http-errors');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const patientRouter = require('./routes/patients');
const doctorRouter = require('./routes/doctors');

const app = express();


app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/patients', patientRouter);
app.use('/doctors', doctorRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  const { message, status, code } = err;
  const error = req.app.get('env') === 'development' ? { message, code } : {};

  res.status(status || 500);
  res.json(error);
});

module.exports = app;
