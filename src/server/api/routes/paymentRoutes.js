/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import paymentDb from '../model/payment/index.js';
 const paymentData = new paymentDb(); //Create an instance of paymentDb
 
 import {
    getPaymentById,
     getPayment,
     addPayment,
     updatePayment,
     deletePayment
 } from '../controllers/payment/paymentController.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
 router.get('/payments', async (req, res) => await getPayment(paymentData, req, res)); // get customers
 router.get('/payments/:paymentsId', async (req, res) => await getPaymentById(paymentData, req, res)); // get customers
 router.post('/payments', async (req, res) => await addPayment(paymentData, req, res)); //add customers
 router.put('/payments/:paymentsId', async (req, res) => await updatePayment(paymentData, req, res)); // update customer
 router.delete('/payments/:paymentsId', async (req, res) => await deletePayment(paymentData, req, res)); //delete customer

 export default router;
