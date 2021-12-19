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
      name: 'shinhan',
      phoneNumber: '1544-7000',
      address: 'https://www.shinhancard.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'bc',
      phoneNumber: '1566-4000',
      address: 'https://www.bccard.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'hyundai',
      phoneNumber: '1577-6000',
      address: 'https://www.hyundaicard.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'kb',
      phoneNumber: '1588-1688',
      address: 'https://customer.kbcard.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'hana',
      phoneNumber: '1800-1111',
      address: 'https://www.hanacard.co.kr/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'woori',
      phoneNumber: '1588-9955',
      address: 'https://pc.wooricard.com/',
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
      category: 'pay',
      price: 2500000,
      isIncome: true,
      outcomeIsCash: false,
      userId,
      userCardId,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      year: 2021,
      month: 12,
      day: 17,
      incomeCategory: null,
      incomePrice: null,
      outcomeCategory: 'food',
      outcomePrice: '10000',
      outcomeIsCash: false,
      userId,
      userCardId,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      year: 2021,
      month: 12,
      day: 17,
      incomeCategory: null,
      incomePrice: null,
      outcomeCategory: 'food',
      outcomePrice: '20000',
      outcomeIsCash: false,
      userId,
      userCardId,
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
