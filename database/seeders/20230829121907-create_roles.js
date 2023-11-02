'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Role', [
      {
        id: 1,
        name: 'user',
        description: 'Default user'
      },
      {
        id: 2,
        name: 'admin',
        description: 'Administration of platform'
      },
      {
        id: 3,
        name: 'owner',
        description: 'Has all permissions'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Role', null)
  }
}
