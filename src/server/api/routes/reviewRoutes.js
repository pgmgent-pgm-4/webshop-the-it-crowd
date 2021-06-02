/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import * as reviewController from '../controllers/review.controller.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
//  router.get('/reviews', reviewController.getReview); // get customers
//  router.get('/reviews/:reviewsId', reviewController.getReviewById); // get customers
//  router.post('/reviews', reviewController.addReview); //add customers
//  router.put('/reviews/:reviewsId', reviewController.updateReview); // update customer
//  router.delete('/reviews/:reviewsId', reviewController.deleteReview); //delete customer

 export default router;
