/**
 * Writing to a Songs DB
 */

 import knexPlantit from '../../lib/knexPlantit.js';
 import Logger from '../../lib/Logger.js';
 
 export default class DiscountDb {
  async findOne(id) {
    try {
      return await knexPlantit('discounts').where({ id: id }).select('*').first();
    } catch (e) {
      Logger.error(e.message);
    }
  }

   /**
    * Adds a todo to our database
    *
    * @param {string} description
    */
   async add( discount_code, product_list, value, active ) {
     try {
       return await knexPlantit('discounts').insert({ discount_code, product_list, value, active });
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
   async update(id, { discount_code, product_list, value, active } ) {
     try {
       return await knexPlantit('discounts').where("id", id).update({ discount_code, product_list, value, active });
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
       return await knexPlantit('discounts').where("id", id).del();
     } catch(e) {
       Logger.error(e.message);
     }
   }
 
   /**
    * Get all the todo items
    */
   async get() {
     try {
       return await knexPlantit('discounts').select("*");
     } catch(e) {
       Logger.error(e.message);
     }
   }
 }