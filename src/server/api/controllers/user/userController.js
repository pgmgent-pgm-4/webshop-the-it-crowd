/**
 * All the CRUD endpoint actions together
 */

 import parseUser from './parseUser.js';
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
 export const getUser = async (user, request, response) => {
   try {
     response.status(200).json({ user: await user.get() });
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
 export const addUser = async (user, request, response) => {
   try {
     const { name, username, email, type, password } = parseUser(request, response);
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     const newUser = await user.add( name, username, email, type, hashedPasswrd );
     response.status(201).json({ user: newUser });
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
 export const updateUser = async (user, request, response) => {
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
 export const deleteUser = async (user, request, response) => {
   try {
     const id = request.params.id;
     await user.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };