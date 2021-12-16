'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('userCards', 'userId', Sequelize.INTEGER)

    await queryInterface.addConstraint('userCards', {
      fields: ['userId'],
      type: 'foreign Key',
      name: 'userCards_users_id_fk',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('userCards', 'userCards_users_id_fk')
    await queryInterface.removeColumn('userCards', 'userId')
  }
};
