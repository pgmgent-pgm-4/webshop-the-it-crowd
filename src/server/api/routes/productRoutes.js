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
  * @swagger
  * /api/products:
  *   get:
  *     summary: Retrieve a list of products
  *     description: Retrieve a list of products. Can be used to populate a list of products when prototyping or testing an API.*
  *     responses:
  *       200:
  *         description: A list of products.
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
  *                         description: The product ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The products name.
  *                         example: Plants   
  */
 router.get('/products', productController.getProducts); // get products
 router.get('/products/:productId', productController.getProductById); // get products
 
 /**
  * @swagger
  * /api/products:
  *   post:
  *     summary: 'Create a new product'
  *     description: 'Create a new product'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     requestBody:
  *         name: product
  *         description: 'The product to create'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The product name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the product'
  *                   example: 'I am describing the product'
  *     responses:
  *       200:
  *         description: The created product.
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
  *                         description: The product ID.
  *                         example: 1
  *                       name:
  *                         type: string
  *                         description: The products name.
  *                         example: Plants
  */
 router.post('/products', productController.createProduct); //add products
 
 /**
  * @swagger
  * /api/products/{productId}:
  *   put:
  *     summary: 'Update an existing product'
  *     description: 'Update an existing product, by primary key.'
  *     consumes:
  *      - application/json
  *     produces: 
  *       - application/json
  *       - text/xml
  *       - text/html
  *     parameters:
  *       - in: path
  *         name: productId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the product id'
  *     requestBody:
  *         name: product
  *         description: 'The product to update'
  *         content: 
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   description: 'The product name'
  *                   example: Plants
  *                 description:
  *                   type: string
  *                   description: 'The description of the product'
  *                   example: 'I am describing the product'
  *     responses:
  *       200:
  *         description: 'product is updated'
  */
 router.put('/products/:productId', productController.updateProduct); // update product
 router.put('/products/:productId/category/:categoryId', productController.addProductCategory); // update product + category
 
 /**
  * @swagger
  * /api/products/{productId}:
  *   delete:
  *     summary: Delete existing product
  *     description: Delete existing product, by primary key.
  *     parameters:
  *       - in: path
  *         name: productId
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: 'the product id'
  *     responses:
  *       200:
  *         description: 'product is deleted'
  */
 router.delete('/products/:productId', productController.deleteProduct); //delete product
 router.delete('/products/:productId/category/:categoryId', productController.deleteProductCategory); // update product + category
 export default router;
 

 