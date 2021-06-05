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
  * @swagger
  * /api/profiles:
  *   get:
  *     summary: Retrieve a list of profiles
  *     description: Retrieve a list of profiles. Can be used to populate a list of profiles when prototyping or testing an API.*
  *     responses:
  *       200:
  *         description: A list of profiles.
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
  *                         description: The profile ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The profiles name.
  *                         example: Plants   
  */
 router.get('/profiles', profileController.getProfiles); // get profiles
 router.get('/profiles/:profileId', profileController.getProfileById); // get profiles
 
 /**
  * @swagger
  * /api/profiles:
  *   post:
  *     summary: 'Create a new profile'
  *     description: 'Create a new profile'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     requestBody:
  *         name: profile
  *         description: 'The profile to create'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The profile name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the profile'
  *                   example: 'I am describing the profile'
  *     responses:
  *       200:
  *         description: The created profile.
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
  *                         description: The profile ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The profiles name.
  *                         example: Plants
  */
 router.post('/profiles', profileController.createProfile); //add profiles
 
 /**
  * @swagger
  * /api/profiles/{profileId}:
  *   put:
  *     summary: 'Update an existing profile'
  *     description: 'Update an existing profile, by primary key.'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     parameters:
  *       - in: path
  *         name: profileId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the profile id'
  *     requestBody:
  *         name: profile
  *         description: 'The profile to update'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The profile name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the profile'
  *                   example: 'I am describing the profile'
  *     responses:
  *       200:
  *         description: 'profile is updated'
  */
 router.put('/profiles/:profileId', profileController.updateProfile); // update customer
 
 /**
  * @swagger
  * /api/profiles/{profileId}:
  *   delete:
  *     summary: Delete existing profile
  *     description: Delete existing profile, by primary key.
  *     parameters:
  *       - in: path
  *         name: profileId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the profile id'
  *     responses:
  *       200:
  *         description: 'profile is deleted'
  */
 
 router.delete('/profiles/:profileId', profileController.deleteProfile); //delete customer
 
 export default router;
 