/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import categoryDb from '../model/category/index.js';
 const categoryData = new categoryDb(); //Create an instance of categoryDb
 
 import {
    getCategoryById,
     getCategory,
     addCategory,
     updateCategory,
     deleteCategory
 } from '../controllers/category/categoryController.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
 router.get('/categories', async (req, res) => await getCategory(categoryData, req, res)); // get customers
 router.get('/categories/:categoriesId', async (req, res) => await getCategoryById(categoryData, req, res)); // get customers
 router.post('/categories', async (req, res) => await addCategory(categoryData, req, res)); //add customers
 router.put('/categories/:categoriesId', async (req, res) => await updateCategory(categoryData, req, res)); // update customer
 router.delete('/categories/:categoriesId', async (req, res) => await deleteCategory(categoryData, req, res)); //delete customer

 export default router;
