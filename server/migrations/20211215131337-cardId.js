'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'cardId', Sequelize.INTEGER)

    await queryInterface.addConstraint('transactions', {
      fields: ['cardId'],
      type: 'foreign Key',
      name: 'transaction_cards_id_fk',
      references: {
        table: 'cards',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('transactions', 'transaction_cards_id_fk')
    await queryInterface.removeColumn('transactions', 'cardId')
  }
};
