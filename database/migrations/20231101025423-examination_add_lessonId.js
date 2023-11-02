'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Examination', 'lessonId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lesson',
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Examination', 'lessonId')
  }
}
