'use strict';
const faker = require('faker');

const list = [];

for (let i = 0; i < 150; i++) {
    const obj = {
        orderId: Math.floor(Math.random() * 150),
        profileId: Math.floor(Math.random() * 150),
        details: faker.commerce.productDescription(),
        total: faker.commerce.price(),
        createdAt:new Date(),
        updatedAt: new Date()
    }
    list.push(obj)
}
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Payment', [...list]);
      },
    
      down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Payment', null, {});
      }
    };
    
