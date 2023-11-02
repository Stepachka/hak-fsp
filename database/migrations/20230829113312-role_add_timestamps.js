'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.addColumn('Role', 'createdAt', {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now')
        }),
        queryInterface.addColumn('Role', 'updatedAt', {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now')
        })
      ])
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.removeColumn('Role', 'createdAt'),
        queryInterface.removeColumn('Role', 'updatedAt')
      ])
    )
  }
}
