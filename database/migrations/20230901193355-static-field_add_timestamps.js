'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.addColumn('StaticField', 'createdAt', {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now')
        }),
        queryInterface.addColumn('StaticField', 'updatedAt', {
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
        queryInterface.removeColumn('StaticField', 'createdAt'),
        queryInterface.removeColumn('StaticField', 'updatedAt')
      ])
    )
  }
}
