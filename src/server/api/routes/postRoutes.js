/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import postDb from '../model/Post/index.js';
 const postData = new postDb(); //Create an instance of userDb
 
 import {
     getPost,
     addPost,
     updatePost,
     deletePost
 } from '../controllers/post/postController.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
 router.get('/posts', async (req, res) => await getPost(postData, req, res)); // get customers
 router.post('/posts', async (req, res) => await addPost(postData, req, res)); //add customers
 router.put('/posts/:id', async (req, res) => await updatePost(postData, req, res)); // update customer
 router.delete('/posts/:id', async (req, res) => await deletePost(postData, req, res)); //delete customer

 export default router;
