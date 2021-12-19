'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'userCardId', Sequelize.INTEGER)

    await queryInterface.addConstraint('transactions', {
      fields: ['userCardId'],
      type: 'foreign Key',
      name: 'transactions_userCards_id_fk',
      references: {
        table: 'userCards',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('transactions', 'transactions_userCards_id_fk')
    await queryInterface.removeColumn('transactions', 'userCardId')
  }
};
