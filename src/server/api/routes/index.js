/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import customerDb from '../model/customer/CustomerDb.js';
 const customerData = new customerDb(); //Create an instance of userDb

 import {
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer
 } from '../controllers/customer/customerController.js';

 /**
  * Make a Router
  */
 const router = express.Router();

 /**
  * Router for users
  */
  router.get('/customers', async (req, res) => await getCustomer(customerData, req, res)); // get customers
  router.post('/customers', async (req, res) => await addCustomer(customerData, req, res)); //add customers
  router.put('/customers/:id', async (req, res) => await updateCustomer(customerData, req, res)); // update customer
  router.delete('/customers/:id', async (req, res) => await deleteCustomer(customerData, req, res)); //delete customer

  export default router;