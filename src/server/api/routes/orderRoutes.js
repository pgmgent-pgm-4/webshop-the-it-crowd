/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import * as orderController from '../controllers/order.controller.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * @swagger
  * /api/orders:
  *   get:
  *     summary: Retrieve a list of orders
  *     description: Retrieve a list of orders. Can be used to populate a list of orders when prototyping or testing an API.*
  *     responses:
  *       200:
  *         description: A list of orders.
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
  *                         description: The order ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The orders name.
  *                         example: Plants   
  */
 router.get('/orders', orderController.getOrders); // get orders
 router.get('/orders/:orderId', orderController.getOrderById); // get orders
 
 /**
  * @swagger
  * /api/orders:
  *   post:
  *     summary: 'Create a new order'
  *     description: 'Create a new order'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     requestBody:
  *         name: order
  *         description: 'The order to create'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The order name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the order'
  *                   example: 'I am describing the order'
  *     responses:
  *       200:
  *         description: The created order.
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
  *                         description: The order ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The orders name.
  *                         example: Plants
  */
 router.post('/orders', orderController.createOrder); //add orders
 
 /**
  * @swagger
  * /api/orders/{orderId}:
  *   put:
  *     summary: 'Update an existing order'
  *     description: 'Update an existing order, by primary key.'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     parameters:
  *       - in: path
  *         name: orderId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the order id'
  *     requestBody:
  *         name: order
  *         description: 'The order to update'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The order name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the order'
  *                   example: 'I am describing the order'
  *     responses:
  *       200:
  *         description: 'order is updated'
  */
 router.put('/orders/:orderId', orderController.updateOrder); // update customer
 
 /**
  * @swagger
  * /api/orders/{orderId}:
  *   delete:
  *     summary: Delete existing order
  *     description: Delete existing order, by primary key.
  *     parameters:
  *       - in: path
  *         name: orderId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the order id'
  *     responses:
  *       200:
  *         description: 'order is deleted'
  */
 
 router.delete('/orders/:orderId', orderController.deleteOrder); //delete customer
 
 export default router;
 