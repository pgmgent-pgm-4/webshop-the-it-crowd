/**
 * Writing to a Songs DB
 */

 import knexPlantit from '../../lib/knexPlantit.js';
 import Logger from '../../lib/Logger.js';
 
 export default class OrderDb {
  async findOne(id) {
    try {
      return await knexPlantit('orders').where({ id: id }).select('*').first();
    } catch (e) {
      Logger.error(e.message);
    }
  }

   /**
    * Adds a todo to our database
    *
    * @param {string} description
    */
   async add( customer_id, status, date_order, product_list ) {
     try {
       return await knexPlantit('orders').insert({ customer_id, status, date_order, product_list });
     } catch(e) {
       Logger.error(e.message);
     }
   }
 
   /**
    * Updates an existing todo item
    *
    * @param {string} id
    * @param {string} description
    */
   async update(id, { customer_id, status, date_order, product_list } ) {
     try {
       return await knexPlantit('orders').where("id", id).update({ customer_id, status, date_order, product_list });
     } catch(e) {
       Logger.error(e.message);
     }
   }
 
   /**
    * Deletes a specific todo
    *
    * @param {string} id
    */
   async delete(id) {
     try {
       return await knexPlantit('orders').where("id", id).del();
     } catch(e) {
       Logger.error(e.message);
     }
   }
 
   /**
    * Get all the todo items
    */
   async get() {
     try {
       return await knexPlantit('orders').select("*");
     } catch(e) {
       Logger.error(e.message);
     }
   }
 }