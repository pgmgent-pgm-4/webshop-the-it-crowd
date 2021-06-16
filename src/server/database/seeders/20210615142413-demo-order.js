'use strict';
const faker = require('faker');

const list = [];

for (let i = 0; i < 150; i++) {
    let obj = {
        orderState: Math.floor(Math.random() * 150),
        profileId: Math.floor(Math.random() * 150),
        createdAt: new Date(),
        updatedAt: new Date()
    }
    list.push(obj)
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Order', [...list]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Order', null, {});
  }
};
