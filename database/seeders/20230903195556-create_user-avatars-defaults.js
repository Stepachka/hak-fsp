'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'StaticField',
      Array.from(Array(30).keys()).map((_, index) => ({
        id: index + 1,
        name: (index + 1).toString() + '.png',
        originalname: (index + 1).toString() + '.png',
        url: `https://hak-fsp.storage.yandexcloud.net/default-avatars/${
          (index + 1).toString() + '.png'
        }`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StaticField')
  }
}
