/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import promotionDb from '../model/promotion/index.js';
 const promotionData = new promotionDb(); //Create an instance of promotionDb
 
 import {
    getPromotionById,
     getPromotion,
     addPromotion,
     updatePromotion,
     deletePromotion
 } from '../controllers/promotion/promotionController.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
 router.get('/promotions', async (req, res) => await getPromotion(promotionData, req, res)); // get customers
 router.get('/promotions/:promotionsId', async (req, res) => await getPromotionById(promotionData, req, res)); // get customers
 router.post('/promotions', async (req, res) => await addPromotion(promotionData, req, res)); //add customers
 router.put('/promotions/:promotionsId', async (req, res) => await updatePromotion(promotionData, req, res)); // update customer
 router.delete('/promotions/:promotionsId', async (req, res) => await deletePromotion(promotionData, req, res)); //delete customer

 export default router;
