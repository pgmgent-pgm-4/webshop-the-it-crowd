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
  * Router for customers
  */
//  router.get('/promotions', promotionController.getPromotion); // get customers
//  router.get('/promotions/:promotionsId', promotionController.getPromotionById); // get customers
//  router.post('/promotions', promotionController.addPromotion); //add customers
//  router.put('/promotions/:promotionsId', promotionController.updatePromotion); // update customer
//  router.delete('/promotions/:promotionsId', promotionController.deletePromotion); //delete customer

 export default router;
