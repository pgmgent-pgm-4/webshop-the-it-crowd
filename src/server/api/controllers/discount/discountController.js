/**
 * All the CRUD endpoint actions together
 */

 import parseDiscount from './parseDiscount.js';
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
 export const getDiscount = async (discount, request, response) => {
   try {
     response.status(200).json({ discount: await discount.get() });
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
 export const addDiscount = async (discount, request, response) => {
   try {
     const { name, username, email, type, password } = parseDiscount(request, response);
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     const newdiscount = await discount.add( name, username, email, type, hashedPasswrd );
     response.status(201).json({ discount: newdiscount });
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
 export const updateDiscount = async (discount, request, response) => {
   try {
     const { name, username, email, type, password } = parseDiscount(request);
     const id = request.params.id;
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     
     const updatedUser = await discount.update(id, { name, username, email, type, hashedPasswrd });
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
 export const deleteDiscount = async (discount, request, response) => {
   try {
     const id = request.params.id;
     await discount.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };