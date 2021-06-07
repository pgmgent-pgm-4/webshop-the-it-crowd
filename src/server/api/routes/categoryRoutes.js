/**
 * Registering the ToDo API endpoints
 */
import express from 'express';
import * as categoryController from '../controllers/category.controller.js';

/**
 * Make a Router
 */
const router = express.Router();

/**
 * Router for customers
 */
// router.get('/categories', categoryController.getCategory); // get customers
// router.get('/categories/:categoriesId', categoryController.getCategoryById); // get customers
// router.get('/categories/:categoriesId/products', categoryController.getCategoryByIdAndproducts); // get customers
// router.post('/categories', categoryController.addCategory); //add customers
// router.put('/categories/:categoriesId', categoryController.updateCategory); // update customer
// router.delete('/categories/:categoriesId', categoryController.deleteCategory); //delete customer

export default router;
