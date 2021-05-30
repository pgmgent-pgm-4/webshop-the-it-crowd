/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import * as profileController from '../controllers/profile.controller.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
 router.get('/profiles', profileController.getProfile); // get customers
 router.get('/profiles/:profilesId', profileController.getProfileById); // get customers
 router.get('/profiles/:profilesId/users', profileController.getProfileByIdAndUsers); // get customers
 router.post('/profiles', profileController.addProfile); //add customers
 router.put('/profiles/:profilesId', profileController.updateProfile); // update customer
 router.delete('/profiles/:profilesId', profileController.deleteProfile); //delete customer

 export default router;
 