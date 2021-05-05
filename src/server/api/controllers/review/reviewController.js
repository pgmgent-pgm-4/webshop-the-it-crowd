/**
 * All the CRUD endpoint actions together
 */

 import parseReview from './parseReview.js';
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
 export const getReview = async (review, request, response) => {
   try {
     response.status(200).json({ review: await review.get() });
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
 export const addReview = async (review, request, response) => {
   try {
     const { name, Reviewname, email, type, password } = parseReview(request, response);
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     const newReview = await review.add( name, Reviewname, email, type, hashedPasswrd );
     response.status(201).json({ review: newReview });
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
 export const updateReview = async (review, request, response) => {
   try {
     const { name, Reviewname, email, type, password } = parseReview(request);
     const id = request.params.id;
     const hashedPasswrd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
     
     const updatedReview = await review.update(id, { name, Reviewname, email, type, hashedPasswrd });
     response.status(200).json({ review: updatedReview });
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
 export const deleteReview = async (review, request, response) => {
   try {
     const id = request.params.id;
     await review.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };