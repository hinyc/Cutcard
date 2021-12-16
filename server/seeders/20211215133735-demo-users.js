'use strict';

const { test } = require("../config/config");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = await queryInterface.bulkInsert('users', [{
      email: 'test@test.com',
      password: '1234',
      nickname: 'cutCard',
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    { returning: ["id"] }
    );
    const cardId = await queryInterface.bulkInsert('cards', [{
      name: 'shinhan',
      number: 1599-8000,
      address: 'https://www.shinhan.com/hpe/index.jsp#050000000000',
      isCut: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    { returning: ["id"] }
    );
    await queryInterface.bulkInsert('transactions', [{
      incomeCategory: 'pay',
      incomePrice: 2500000,
      outcomeCategory: null,
      outcomePrice: null,
      outcomeIsCash: false,
      userId,
      cardId,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('cards', null, {})
    await queryInterface.bulkDelete('transactions', null, {})
  }
};
