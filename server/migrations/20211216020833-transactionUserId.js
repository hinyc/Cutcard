'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'userId', Sequelize.INTEGER)

    await queryInterface.addConstraint('transactions', {
      fields: ['userId'],
      type: 'foreign Key',
      name: 'transactions_users_id_fk',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('transactions', 'transactions_users_id_fk')
    await queryInterface.removeColumn('transactions', 'userId')
  }
};
