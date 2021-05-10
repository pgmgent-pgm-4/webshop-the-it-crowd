/**
 * All the CRUD endpoint actions together
 */

 import parsePost from './parsePost.js';
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
 export const getPost = async (post, request, response) => {
   try {
     response.status(200).json({ post: await post.get() });
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
 export const addPost = async (post, request, response) => {
   try {
     const { title, text, categories } = parsePost(request, response);
     //const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     const newPost = await post.add(  title, text, categories );
     response.status(201).json({ post: newPost });
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
 export const updatePost = async (user, request, response) => {
   try {
     const { name, username, email, type, password } = parsePost(request);
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
 export const deletePost = async (user, request, response) => {
   try {
     const id = request.params.id;
     await user.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };