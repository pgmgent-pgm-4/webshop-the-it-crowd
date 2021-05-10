/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import userDb from '../model/user/UserDb.js';
 const userData = new userDb(); //Create an instance of userDb

 import {
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
  * Router for users
  */
  router.get('/users', async (req, res) => await getUser(userData, req, res)); // get users
  router.post('/users', async (req, res) => await addUser(userData, req, res)); //add user
  router.put('/users/:id', async (req, res) => await updateUser(userData, req, res)); // update user
  router.delete('/users/:id', async (req, res) => await deleteUser(userData, req, res)); //delete user

  export default router;