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
    },
    {
      name: 'bc',
      phoneNumber: '1566-4000',
      address: 'https://www.bccard.com/app/card/CstmrCentSubmain.do',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'hyundai',
      phoneNumber: '1577-6000',
      address: 'https://www.hyundaicard.com/cpu/ma/CPUMA0101_01.hc',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'kb',
      phoneNumber: '1588-1688',
      address: 'https://customer.kbcard.com/CXCRSZZC0001.cms?type=',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'hana',
      phoneNumber: '1800-1111',
      address: 'https://www.hanacard.co.kr/OSA60000000D.web?schID=scd&mID=OSA60000000D',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'woori',
      phoneNumber: '1588-9955',
      address: 'https://pc.wooricard.com/dcpc/yh1/cct/cct01/H1CCT201S00.do',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
    { returning: ["id"] }
    );
    const userCardsId = await queryInterface.bulkInsert('userCards', [{
      isCut: true,
      remainValue: 400000,
      userId,
      cardId,
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    { returning: ["id"] }
    );
    await queryInterface.bulkInsert('transactions', [{
      date: '202112',
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
