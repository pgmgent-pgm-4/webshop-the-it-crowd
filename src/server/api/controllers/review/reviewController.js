/**
 * All the CRUD endpoint actions together
 */

 import parseReview from './parseReview.js';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getReview = async (review, request, response) => {
   try {
     response.status(200).json({ review: await review.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };

 export const getReviewById = async (review, request, response) => {
    try {
        const id = request.params.reviewsId;
      response.status(200).json({ review: await review.findOne(id) });
    } catch({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  };
 
 export const addReview = async (review, request, response) => {
   try {
     const { score, description, user_id, product_id } = parseReview(request, response);
     const create_date = new Date().toLocaleDateString();
     const newReview = await review.add( score, description, user_id, product_id );
     response.status(201).json({ review: newReview });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };

 export const updateReview = async (review, request, response) => {
   try {
     const { score, description, user_id, product_id } = parseReview(request);
     const id = request.params.reviewsId;

     const updatedReview = await review.update(id, score, description, user_id, product_id);
     response.status(200).json({ review: updatedReview });
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const deleteReview = async (review, request, response) => {
   try {
    const id = request.params.reviewsId;
     await review.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };