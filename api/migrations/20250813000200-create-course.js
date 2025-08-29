'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: 'INTEGER'
      },
      title: {
        type: 'STRING',
        allowNull: false
      },
      description: {
        type: 'TEXT',
        allowNull: false
      },
      estimatedTime: {
        type: 'STRING',
        allowNull: true
      },
      materialsNeeded: {
        type: 'STRING',
        allowNull: true
      },
      userId: {
        type: 'INTEGER',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Courses');
  }
};
