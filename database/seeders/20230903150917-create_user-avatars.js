'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserAvatar', [
      {
        id: 1,
        userId: 1,
        staticFieldId: 19
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserAvatar', null)
  }
}
