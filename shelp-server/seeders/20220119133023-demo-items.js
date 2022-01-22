'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('items', [
      {
        id: 1,
        userId: 1,
        name: '사과',
        quantity: 3,
        desc: '옆집에서 선물로 받음',
        storage: '냉장',
        expiration: "2022-02-21",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        name: '냉동만두',
        quantity: 4,
        desc: '청과시장에서 구매함',
        storage: '냉동',
        expiration: "2022-02-01",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {});
  }
};