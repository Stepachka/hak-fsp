'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('User', 'defaultAvatarId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'StaticField', key: 'id' },
      onDelete: 'SET NULL',
      defaultValue: 7
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'defaultAvatarId')
  }
}
