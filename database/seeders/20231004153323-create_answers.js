'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ExaminationAnswer', [
      {
        id: 1,
        name: '512',
        questionId: 1,
        isRight: false
      },
      {
        id: 2,
        name: '1024',
        questionId: 1,
        isRight: true
      },
      {
        id: 3,
        name: '2048',
        questionId: 1,
        isRight: false
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ExaminationAnswer', null)
  }
}
