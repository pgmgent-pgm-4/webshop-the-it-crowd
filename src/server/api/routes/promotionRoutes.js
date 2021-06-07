/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import * as promotionController from '../controllers/promotion.controller.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * @swagger
  * /api/promotions:
  *   get:
  *     summary: Retrieve a list of promotions
  *     description: Retrieve a list of promotions. Can be used to populate a list of promotions when prototyping or testing an API.*
  *     responses:
  *       200:
  *         description: A list of promotions.
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
  *                         description: The promotion ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The promotions name.
  *                         example: Plants   
  */
 router.get('/promotions', promotionController.getPromotions); // get promotions
 router.get('/promotions/:promotionId', promotionController.getPromotionById); // get promotions
 
 /**
  * @swagger
  * /api/promotions:
  *   post:
  *     summary: 'Create a new promotion'
  *     description: 'Create a new promotion'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     requestBody:
  *         name: promotion
  *         description: 'The promotion to create'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The promotion name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the promotion'
  *                   example: 'I am describing the promotion'
  *     responses:
  *       200:
  *         description: The created promotion.
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
  *                         description: The promotion ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The promotions name.
  *                         example: Plants
  */
 router.post('/promotions', promotionController.createPromotion); //add promotions
 
 /**
  * @swagger
  * /api/promotions/{promotionId}:
  *   put:
  *     summary: 'Update an existing promotion'
  *     description: 'Update an existing promotion, by primary key.'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     parameters:
  *       - in: path
  *         name: promotionId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the promotion id'
  *     requestBody:
  *         name: promotion
  *         description: 'The promotion to update'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The promotion name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the promotion'
  *                   example: 'I am describing the promotion'
  *     responses:
  *       200:
  *         description: 'promotion is updated'
  */
 router.put('/promotions/:promotionId', promotionController.updatePromotion); // update customer
 
 /**
  * @swagger
  * /api/promotions/{promotionId}:
  *   delete:
  *     summary: Delete existing promotion
  *     description: Delete existing promotion, by primary key.
  *     parameters:
  *       - in: path
  *         name: promotionId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the promotion id'
  *     responses:
  *       200:
  *         description: 'promotion is deleted'
  */
 
 router.delete('/promotions/:promotionId', promotionController.deletePromotion); //delete customer
 
 export default router;
 

 