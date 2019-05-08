'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patients', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Users', key: 'id' },
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      address: {
        type: Sequelize.BLOB,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.STRING,
      },
    }).then(() => { });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Patients');
  }
};
