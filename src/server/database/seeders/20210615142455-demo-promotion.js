'use strict';
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const list = [];

for (let i = 0; i < 150; i++) {
  const obj = {
    promoCode: uuidv4(),
    value: (Math.floor(Math.random() * 10)/10),
    productId: Math.floor(Math.random() * 150),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  list.push(obj)
    
}
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Promotion', [...list]);
      },
    
      down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Promotion', null, {});
      }
    };
    
