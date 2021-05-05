/**
 * Writing to a Songs DB
 */

 import knexPlantit from '../../lib/knexPlantit.js';
 import Logger from '../../lib/Logger.js';
 
 export default class ReviewDb {
  async findOne(id) {
    try {
      return await knexPlantit('reviews').where({ id: id }).select('*').first();
    } catch (e) {
      Logger.error(e.message);
    }
  }

   /**
    * Adds a todo to our database
    *
    * @param {string} description
    */
   async add( product_id, customer_id, description, score, date_created ) {
     try {
       return await knexPlantit('reviews').insert({ product_id, customer_id, description, score, date_created });
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
   async update(id, { product_id, customer_id, description, score, date_created } ) {
     try {
       return await knexPlantit('reviews').where("id", id).update({ product_id, customer_id, description, score, date_created });
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
       return await knexPlantit('reviews').where("id", id).del();
     } catch(e) {
       Logger.error(e.message);
     }
   }
 
   /**
    * Get all the todo items
    */
   async get() {
     try {
       return await knexPlantit('reviews').select("*");
     } catch(e) {
       Logger.error(e.message);
     }
   }
 }