/**
 * All the CRUD endpoint actions together
 */

 import parseOrder from './parseOrder.js';
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
 export const getOrder = async (order, request, response) => {
   try {
     response.status(200).json({ order: await order.get() });
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
 export const addOrder = async (order, request, response) => {
   try {
     const { name, ordername, email, type, password } = parseOrder(request, response);
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     const newOrder = await order.add( name, ordername, email, type, hashedPasswrd );
     response.status(201).json({ order: newOrder });
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
 export const updateOrder = async (order, request, response) => {
   try {
     const { name, ordername, email, type, password } = parseOrder(request);
     const id = request.params.id;
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     
     const updatedOrder = await order.update(id, { name, ordername, email, type, hashedPasswrd });
     response.status(200).json({ order: updatedOrder });
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
 export const deleteOrder = async (order, request, response) => {
   try {
     const id = request.params.id;
     await order.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };