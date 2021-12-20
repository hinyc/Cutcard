'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('userCards', 'cardId', Sequelize.INTEGER)

    await queryInterface.addConstraint('userCards', {
      fields: ['cardId'],
      type: 'foreign Key',
      name: 'userCards_cards_id_fk',
      references: {
        table: 'cards',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('userCards', 'userCards_cards_id_fk')
    await queryInterface.removeColumn('userCards', 'cardId')
  }
};
