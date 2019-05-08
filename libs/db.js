const Sequelize = require('sequelize');
const { db } = require('config');

const sequelize = new Sequelize(db);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to database.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;