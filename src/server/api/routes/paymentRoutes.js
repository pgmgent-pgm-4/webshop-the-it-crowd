/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import * as paymentController from '../controllers/payment.controller.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * @swagger
  * /api/payments:
  *   get:
  *     summary: Retrieve a list of payments
  *     description: Retrieve a list of payments. Can be used to populate a list of payments when prototyping or testing an API.*
  *     responses:
  *       200:
  *         description: A list of payments.
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
  *                         description: The payment ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The payments name.
  *                         example: Plants   
  */
 router.get('/payments', paymentController.getPayments); // get payments
 router.get('/payments/:paymentId', paymentController.getPaymentById); // get payments
 
 /**
  * @swagger
  * /api/payments:
  *   post:
  *     summary: 'Create a new payment'
  *     description: 'Create a new payment'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     requestBody:
  *         name: payment
  *         description: 'The payment to create'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The payment name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the payment'
  *                   example: 'I am describing the payment'
  *     responses:
  *       200:
  *         description: The created payment.
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
  *                         description: The payment ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The payments name.
  *                         example: Plants
  */
 router.post('/payments', paymentController.createPayment); //add payments
 
 /**
  * @swagger
  * /api/payments/{paymentId}:
  *   put:
  *     summary: 'Update an existing payment'
  *     description: 'Update an existing payment, by primary key.'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     parameters:
  *       - in: path
  *         name: paymentId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the payment id'
  *     requestBody:
  *         name: payment
  *         description: 'The payment to update'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The payment name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the payment'
  *                   example: 'I am describing the payment'
  *     responses:
  *       200:
  *         description: 'payment is updated'
  */
 router.put('/payments/:paymentId', paymentController.updatePayment); // update customer
 
 /**
  * @swagger
  * /api/payments/{paymentId}:
  *   delete:
  *     summary: Delete existing payment
  *     description: Delete existing payment, by primary key.
  *     parameters:
  *       - in: path
  *         name: paymentId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the payment id'
  *     responses:
  *       200:
  *         description: 'payment is deleted'
  */
 
 router.delete('/payments/:paymentId', paymentController.deletePayment); //delete customer
 
 export default router;
 
 