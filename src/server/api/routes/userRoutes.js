/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import userDb from '../model/user/index.js';
 const userData = new userDb(); //Create an instance of userDb
 
 import {
    getUserById,
     getUser,
     addUser,
     updateUser,
     deleteUser
 } from '../controllers/user/userController.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
 router.get('/users', async (req, res) => await getUser(userData, req, res)); // get customers
 router.get('/users/:usersId', async (req, res) => await getUserById(userData, req, res)); // get customers
 router.post('/users', async (req, res) => await addUser(userData, req, res)); //add customers
 router.put('/users/:usersId', async (req, res) => await updateUser(userData, req, res)); // update customer
 router.delete('/users/:usersId', async (req, res) => await deleteUser(userData, req, res)); //delete customer

 export default router;
