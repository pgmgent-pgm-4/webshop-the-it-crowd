/**
 * All the CRUD endpoint actions together
 */

 import parseProduct from './parseProduct.js';
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
 export const getProduct = async (product, request, response) => {
   try {
     response.status(200).json({ product: await product.get() });
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
 export const addProduct = async (product, request, response) => {
   try {
     const { name, productname, email, type, password } = parseProduct(request, response);
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     const newproduct = await product.add( name, productname, email, type, hashedPasswrd );
     response.status(201).json({ product: newproduct });
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
 export const updateProduct = async (product, request, response) => {
   try {
     const { name, productname, email, type, password } = parseProduct(request);
     const id = request.params.id;
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     
     const updatedproduct = await product.update(id, { name, productname, email, type, hashedPasswrd });
     response.status(200).json({ product: updatedproduct });
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
 export const deleteProduct = async (product, request, response) => {
   try {
     const id = request.params.id;
     await product.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };