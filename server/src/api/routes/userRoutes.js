/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import * as userController from '../controllers/user.controller.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
 router.get('/users', userController.getUser); // get customers
 router.get('/users/:usersId', userController.getUserById); // get customers
 router.post('/users', userController.addUser); //add customers
 router.put('/users/:usersId', userController.updateUser); // update customer
 router.delete('/users/:usersId', userController.deleteUser); //delete customer

 export default router;
