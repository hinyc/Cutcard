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
    },{
      email: 'yechan@gmail.com',
      password: '1q2w3e4r',
      nickname: '예찬',
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    { returning: ["id"] }
    );
    const cardId = await queryInterface.bulkInsert('cards', [{
      name: '국민카드',
      phoneNumber: '1588-1688',
      address: 'https://www.kbcard.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '신한카드',
      phoneNumber: '1544-7000',
      address: 'https://www.shinhancard.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '하나카드',
      phoneNumber: '1800-1111',
      address: 'https://global.hanacard.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '롯데카드',
      phoneNumber: '1588-8100',
      address: 'https://customer.kbcard.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '비씨카드',
      phoneNumber: '1800-1111',
      address: 'https://bccard.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '농협카드',
      phoneNumber: '1644-4000',
      address: 'https://card.nonghyup.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: '삼성카드',
      phoneNumber: '1588-8700',
      address: 'https://www.samsungcard.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: '현대카드',
      phoneNumber: '1577-6000',
      address: 'https://www.hyundaicard.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
    { returning: ["id"] }
    );
    const userCardId = await queryInterface.bulkInsert('userCards', [{
      isCut: true,
      remainValue: 400000,
      repaymentDay: 25,
      userId: 1,
      cardId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      isCut: true,
      remainValue: 400000,
      repaymentDay: 25,
      userId: 2,
      cardId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      isCut: true,
      remainValue: 400000,
      repaymentDay: 25,
      userId: 2,
      cardId: 3,
      createdAt: new Date(),
      updatedAt: new Date() 
    }],
    { returning: ["id"] }
    );
    await queryInterface.bulkInsert('transactions', [{
      year: 2021,
      month: 12,
      day: 17,
      category: '월급',
      price: 2500000,
      isIncome: true,
      outcomeIsCash: false,
      userId: 1,
      userCardId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      year: 2021,
      month: 12,
      day: 17,
      category: '식비',
      price: 50000,
      isIncome: false,
      outcomeIsCash: false,
      userId: 2,
      userCardId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      year: 2021,
      month: 12,
      day: 17,
      category: '생활용품',
      price: 25000,
      isIncome: false,
      outcomeIsCash: true,
      userId: 2,
      userCardId: 3,
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
