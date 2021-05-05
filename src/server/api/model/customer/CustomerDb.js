/**
 * Writing to a Songs DB
 */

 import knexUsers from '../../../db/knexPlantit.js';
 import Logger from '../../lib/Logger.js';
 
 export default class CustomerDb {
  async findOne(username) {
    try {
      return await knexUsers('customers').where({ username: username }).select('*').first();
    } catch (e) {
      Logger.error(e.message);
    }
  }

   /**
    * Adds a todo to our database
    *
    * @param {string} description
    */
   async add( name, username, email, type, password ) {
     try {
       return await knexUsers('customers').insert({ name, username, email, type, password });
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
   async update(id, { name, username, email, type, password } ) {
     try {
       return await knexUsers('customers').where("id", id).update({ name, username, email, type, password });
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
       return await knexUsers('customers').where("id", id).del();
     } catch(e) {
       Logger.error(e.message);
     }
   }
 
   /**
    * Get all the todo items
    */
   async get() {
     try {
       return await knexUsers('customers').select("*");
     } catch(e) {
       Logger.error(e.message);
     }
   }
 }