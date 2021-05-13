/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import profileDb from '../model/profile/index.js';
 const profileData = new profileDb(); //Create an instance of userDb
 
 import {
    getProfileById,
     getProfile,
     addProfile,
     updateProfile,
     deleteProfile
 } from '../controllers/profile/profileController.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
 router.get('/profiles', async (req, res) => await getProfile(profileData, req, res)); // get customers
 router.get('/profiles/:profilesId', async (req, res) => await getProfileById(profileData, req, res)); // get customers
 router.post('/profiles', async (req, res) => await addProfile(profileData, req, res)); //add customers
 router.put('/profiles/:profilesId', async (req, res) => await updateProfile(profileData, req, res)); // update customer
 router.delete('/profiles/:profilesId', async (req, res) => await deleteProfile(profileData, req, res)); //delete customer

 export default router;
