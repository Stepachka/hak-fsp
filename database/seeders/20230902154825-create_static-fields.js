'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StaticField', [
      {
        name: '29e80db2-70ce-4bb2-b039-cabb5f067254.webp',
        originalname: 'EUOV1Jc-3ik.jpg',
        url: 'https://storage.yandexcloud.net/hak-fsp/uploads/1679498562_celes-club-p-anime-arti-malchikov-instagram-41.jpg',
        type: 'image/jpeg',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StaticField', null)
  }
}
