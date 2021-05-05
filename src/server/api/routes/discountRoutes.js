 /**
 * Registering the ToDo API endpoints
 */
  import express from 'express';
  import discountDb from '../model/discount/DiscountDb.js';
  const discountData = new discountDb(); //Create an instance of userDb
  
  import {
      getDiscount,
      addDiscount,
      updateDiscount,
      deleteDiscount
  } from '../controllers/discount/discountController.js';
  
  /**
   * Make a Router
   */
  const router = express.Router();
  
  /**
   * Router for customers
   */
  router.get('/discounts', async (req, res) => await getDiscount(discountData, req, res)); // get customers
  router.post('/discounts', async (req, res) => await addDiscount(discountData, req, res)); //add customers
  router.put('/discounts/:id', async (req, res) => await updateDiscount(discountData, req, res)); // update customer
  router.delete('/discounts/:id', async (req, res) => await deleteDiscount(discountData, req, res)); //delete customer
 
  export default router;
