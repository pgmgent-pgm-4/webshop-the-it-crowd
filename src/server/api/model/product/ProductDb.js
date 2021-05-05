/**
 * Writing to a Songs DB
 */

 import knexPlantit from '../../lib/knexPlantit.js';
 import Logger from '../../lib/Logger.js';
 
 export default class ProductDb {
  async findOne(id) {
    try {
      return await knexPlantit('products').where({ id: id }).select('*').first();
    } catch (e) {
      Logger.error(e.message);
    }
  }

   /**
    * Adds a todo to our database
    *
    * @param {string} description
    */
   async add( name, price, description, brand,category, tags, images ) {
     try {
       return await knexPlantit('products').insert({ name, price, description, brand,category, tags, images });
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
   async update(id, { name, price, description, brand,category, tags, images } ) {
     try {
       return await knexPlantit('products').where("id", id).update({ name, price, description, brand,category, tags, images });
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
       return await knexPlantit('products').where("id", id).del();
     } catch(e) {
       Logger.error(e.message);
     }
   }
 
   /**
    * Get all the todo items
    */
   async get() {
     try {
       return await knexPlantit('products').select("*");
     } catch(e) {
       Logger.error(e.message);
     }
   }
 }