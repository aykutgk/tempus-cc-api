'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.BLOB,
      },
      role: {
        type: Sequelize.ENUM,
        values: ['doctor', 'patient'],
        defaultValue: 'patient',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    }).then(() => {
      queryInterface.addIndex('Users', ['uuid']);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
