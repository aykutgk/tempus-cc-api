'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Doctors', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Users', key: 'id' },
      },
    }).then(() => { });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Doctors');
  }
};
