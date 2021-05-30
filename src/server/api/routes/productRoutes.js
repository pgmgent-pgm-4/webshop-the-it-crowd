/**
 * Registering the ToDo API endpoints
 */
 import express from 'express';
 import * as productController from '../controllers/product.controller.js';
 
 /**
  * Make a Router
  */
 const router = express.Router();
 
 /**
  * Router for customers
  */
 router.get('/products', productController.getProduct); // get customers
 router.get('/products/:productsId', productController.getProductById); // get customers
 router.get('/products/:productsId/categories', productController.getProductByIdAndCategories); // get customers
 router.get('/products/:productsId/reviews', productController.getProductByIdAndReviews); // get customers
 router.get('/products/:productsId/promotions', productController.getProductByIdAndPromotions); // get customers
 router.get('/products/:productsId/orders', productController.getProductByIdAndOrders); // get customers
 router.post('/products', productController.addProduct); //add customers
 router.put('/products/:productsId', productController.updateProduct); // update customer
 router.delete('/products/:productsId', productController.deleteProduct); //delete customer

 export default router;
 