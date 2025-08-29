'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: 'INTEGER'
      },
      firstName: {
        type: 'STRING',
        allowNull: false
      },
      lastName: {
        type: 'STRING',
        allowNull: false
      },
      emailAddress: {
        type: 'STRING',
        allowNull: false,
        unique: true
      },
      password: {
        type: 'STRING',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: 'DATE',
        defaultValue: queryInterface.sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: 'DATE',
        defaultValue: queryInterface.sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};
