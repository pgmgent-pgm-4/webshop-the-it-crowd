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
  * @swagger
  * /api/reviews:
  *   get:
  *     summary: Retrieve a list of reviews
  *     description: Retrieve a list of reviews. Can be used to populate a list of reviews when prototyping or testing an API.*
  *     responses:
  *       200:
  *         description: A list of reviews.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: integer
  *                         description: The review ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The reviews name.
  *                         example: Plants   
  */
 router.get('/reviews', reviewController.getReviews); // get reviews
 router.get('/reviews/:reviewId', reviewController.getReviewById); // get reviews
 
 /**
  * @swagger
  * /api/reviews:
  *   post:
  *     summary: 'Create a new review'
  *     description: 'Create a new review'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     requestBody:
  *         name: review
  *         description: 'The review to create'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The review name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the review'
  *                   example: 'I am describing the review'
  *     responses:
  *       200:
  *         description: The created review.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: integer
  *                         description: The review ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The reviews name.
  *                         example: Plants
  */
 router.post('/reviews', reviewController.createReview); //add reviews
 
 /**
  * @swagger
  * /api/reviews/{reviewId}:
  *   put:
  *     summary: 'Update an existing review'
  *     description: 'Update an existing review, by primary key.'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     parameters:
  *       - in: path
  *         name: reviewId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the review id'
  *     requestBody:
  *         name: review
  *         description: 'The review to update'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The review name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the review'
  *                   example: 'I am describing the review'
  *     responses:
  *       200:
  *         description: 'review is updated'
  */
 router.put('/reviews/:reviewId', reviewController.updateReview); // update customer
 
 /**
  * @swagger
  * /api/reviews/{reviewId}:
  *   delete:
  *     summary: Delete existing review
  *     description: Delete existing review, by primary key.
  *     parameters:
  *       - in: path
  *         name: reviewId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the review id'
  *     responses:
  *       200:
  *         description: 'review is deleted'
  */
 
 router.delete('/reviews/:reviewId', reviewController.deleteReview); //delete customer
 
 export default router;
 

 