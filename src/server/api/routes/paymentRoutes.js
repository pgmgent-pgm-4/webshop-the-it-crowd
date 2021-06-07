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
 * Router for customers
 */
// router.get('/payments', paymentController.getPayment); // get customers
// router.get('/payments/:paymentsId', paymentController.getPaymentById); // get customers
// router.post('/payments', paymentController.addPayment); //add customers
// router.put('/payments/:paymentsId', paymentController.updatePayment); // update customer
// router.delete('/payments/:paymentsId', paymentController.deletePayment); //delete customer

export default router;