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
 * Router for customers
 */
router.get('/orders', orderController.getOrder); // get customers
router.get('/orders/:ordersId', orderController.getOrderById); // get customers
router.post('/orders', orderController.addOrder); //add customers
router.put('/orders/:ordersId', orderController.updateOrder); // update customer
router.delete('/orders/:ordersId', orderController.deleteOrder); //delete customer

export default router;