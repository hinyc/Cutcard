'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      incomeCategory: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      incomePrice: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      outcomeCategory: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      outcomePrice: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      outcomeIsCash: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};