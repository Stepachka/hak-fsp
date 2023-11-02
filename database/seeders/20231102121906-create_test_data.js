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
    ]),
      await queryInterface.bulkInsert('User', [
        {
          id: 1,
          nickname: 'stepancka',
          name: 'Stepan',
          email: 'stepan.talabaev@mail.ru',
          password:
            '$2a$05$xqY4CUGu7DaJaELkmunOe.b4cJpSuzsAP3vSlusbU/Fg58c4Rtfgq',
          roleId: 3
        }
      ]),
      await queryInterface.bulkInsert('StaticField', [
        {
          name: '29e80db2-70ce-4bb2-b039-cabb5f067254.webp',
          originalname: 'EUOV1Jc-3ik.jpg',
          url: 'https://storage.yandexcloud.net/hak-fsp/uploads/1679498562_celes-club-p-anime-arti-malchikov-instagram-41.jpg',
          type: 'image/jpeg',
          updatedAt: '2023-09-02T15:07:31.676Z',
          createdAt: '2023-09-02T15:07:31.676Z'
        }
      ]),
      await queryInterface.bulkInsert('UserAvatar', [
        {
          id: 1,
          userId: 1,
          staticFieldId: 19
        }
      ]),
      await queryInterface.bulkInsert(
        'StaticField',
        Array.from(Array(18).keys()).map((_, index) => ({
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
      ),
      await queryInterface.bulkInsert('Lesson', [
        {
          id: 1,
          title: 'Test examination',
          description: 'First a test examination'
        }
      ]),
      await queryInterface.bulkInsert('Examination', [
        {
          id: 1,
          title: 'General testing for knowledge of the IT',
          description:
            'Answer all the questions correctly to get the role of the publisher',
          lessonId: 1
        }
      ])

    await queryInterface.bulkInsert('ExaminationQuestion', [
      {
        id: 1,
        name: 'How many bits are in one kilobyte?',
        examinationId: 1
      }
    ]),
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
    await queryInterface.bulkDelete('Role', null)
    await queryInterface.bulkDelete('User', null)
    await queryInterface.bulkDelete('StaticField', null)
    await queryInterface.bulkDelete('UserAvatar', null)
    await queryInterface.bulkDelete('StaticField')
    await queryInterface.bulkDelete('ExaminationAnswer', null)
    await queryInterface.bulkDelete('ExaminationQuestion', null)
    await queryInterface.bulkDelete('Examination', null)
    await queryInterface.bulkDelete('Lesson', null)
  }
}
