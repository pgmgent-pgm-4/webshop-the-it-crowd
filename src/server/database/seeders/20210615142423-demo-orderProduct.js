'use strict';
const faker = require('faker');

const list = [];

for (let i = 0; i < 150; i++) {
   const obj = {
    orderId: Math.floor(Math.random() * 150),
    productId: Math.floor(Math.random() * 150),
    productPrice: Math.floor(Math.random() * 150),
    productAmount: Math.floor(Math.random() * 150),
    createdAt: new Date(),
    updatedAt: new Date()
   }
   list.push(obj)
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            return queryInterface.bulkInsert('OrderProduct', [...list]);
        } catch (error) {
            
        }
      },
    
      down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('OrderProduct', null, {});
      }
    };
    
