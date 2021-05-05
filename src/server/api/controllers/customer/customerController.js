/**
 * All the CRUD endpoint actions together
 */

 import parseCustomer from './parseCustomer.js';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 /**
  * Getting the todos
  *
  * @param {*} song
  * @param {*} request
  * @param {*} response
  */
 export const getCustomer = async (customer, request, response) => {
   try {
     response.status(200).json({ customer: await customer.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };
 
 /**
  * Creates a new todo item
  *
  * @param {*} song
  * @param {*} request
  * @param {*} response
  */
 export const addCustomer = async (customer, request, response) => {
   try {
     const { name, username, email, type, password } = parseCustomer(request, response);
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     const newCustomer = await customer.add( name, username, email, type, hashedPasswrd );
     response.status(201).json({ customer: newCustomer });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 /**
  * Update a new todo item
  *
  * @param {*} song
  * @param {*} request
  * @param {*} response
  */
 export const updateCustomer = async (user, request, response) => {
   try {
     const { name, username, email, type, password } = parseUser(request);
     const id = request.params.id;
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     
     const updatedUser = await user.update(id, { name, username, email, type, hashedPasswrd });
     response.status(200).json({ user: updatedUser });
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 /**
  * Delete a todo item
  *
  * @param {*} song
  * @param {*} request
  * @param {*} response
  */
 export const deleteCustomer = async (user, request, response) => {
   try {
     const id = request.params.id;
     await user.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };