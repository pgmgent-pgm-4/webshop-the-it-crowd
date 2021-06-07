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
  * @swagger
  * /api/users:
  *   get:
  *     summary: Retrieve a list of users
  *     description: Retrieve a list of users. Can be used to populate a list of users when prototyping or testing an API.*
  *     responses:
  *       200:
  *         description: A list of users.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: integer
  *                         description: The user ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The users name.
  *                         example: Plants   
  */
 router.get('/users', userController.getUsers); // get users
 router.get('/users/:userId', userController.getUserById); // get users
 
 /**
  * @swagger
  * /api/users:
  *   post:
  *     summary: 'Create a new user'
  *     description: 'Create a new user'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     requestBody:
  *         name: user
  *         description: 'The user to create'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The user name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the user'
  *                   example: 'I am describing the user'
  *     responses:
  *       200:
  *         description: The created user.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: integer
  *                         description: The user ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The users name.
  *                         example: Plants
  */
 router.post('/users', userController.createUser); //add users
 
 /**
  * @swagger
  * /api/users/{userId}:
  *   put:
  *     summary: 'Update an existing user'
  *     description: 'Update an existing user, by primary key.'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     parameters:
  *       - in: path
  *         name: userId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the user id'
  *     requestBody:
  *         name: user
  *         description: 'The user to update'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The user name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the user'
  *                   example: 'I am describing the user'
  *     responses:
  *       200:
  *         description: 'user is updated'
  */
 router.put('/users/:userId', userController.updateUser); // update customer
 
 /**
  * @swagger
  * /api/users/{userId}:
  *   delete:
  *     summary: Delete existing user
  *     description: Delete existing user, by primary key.
  *     parameters:
  *       - in: path
  *         name: userId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the user id'
  *     responses:
  *       200:
  *         description: 'user is deleted'
  */
 
 router.delete('/users/:userId', userController.deleteUser); //delete customer
 
 export default router;
 

 