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
      phoneNumber: '1544-7000',
      address: 'https://www.shinhancard.com/mob/MOBFM12101N/MOBFM12101R01.shc',
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    { returning: ["id"] }
    );
    const userCardsId = await queryInterface.bulkInsert('userCards', [{
      isCut: true,
      remainValue: 400000,
      repaymentDay: 25,
      userId,
      cardId,
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    { returning: ["id"] }
    );
    await queryInterface.bulkInsert('transactions', [{
      year: 2021,
      month: 12,
      day: 17,
      incomeCategory: 'pay',
      incomePrice: 2500000,
      outcomeCategory: null,
      outcomePrice: null,
      outcomeIsCash: false,
      userId,
      userCardsId,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('cards', null, {})
    await queryInterface.bulkDelete('userCards', null, {})
    await queryInterface.bulkDelete('transactions', null, {})
  }
};
