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
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Retrieve a list of categories. Can be used to populate a list of categories when prototyping or testing an API.*
 *     responses:
 *       200:
 *         description: A list of categories.
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
 *                         description: The category ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The categories name.
 *                         example: Plants   
 */
router.get('/categories', categoryController.getCategories); // get categories
router.get('/categories/:categoryId', categoryController.getCategoryById); // get categories

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: 'Create a new category'
 *     description: 'Create a new category'
 *     consumes:
 *      - application/json
 *     produces: 
 *       - application/json
 *       - text/xml
 *       - text/html
 *     requestBody:
 *         name: category
 *         description: 'The category to create'
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: 'The category name'
 *                   example: Plants
 *                 description:
 *                   type: string
 *                   description: 'The description of the category'
 *                   example: 'I am describing the category'
 *     responses:
 *       200:
 *         description: The created category.
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
 *                         description: The category ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The categories name.
 *                         example: Plants
 */
router.post('/categories', categoryController.createCategory); //add categories

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   put:
 *     summary: 'Update an existing category'
 *     description: 'Update an existing category, by primary key.'
 *     consumes:
 *      - application/json
 *     produces: 
 *       - application/json
 *       - text/xml
 *       - text/html
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 'the category id'
 *     requestBody:
 *         name: category
 *         description: 'The category to update'
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: 'The category name'
 *                   example: Plants
 *                 description:
 *                   type: string
 *                   description: 'The description of the category'
 *                   example: 'I am describing the category'
 *     responses:
 *       200:
 *         description: 'category is updated'
 */
router.put('/categories/:categoryId', categoryController.updateCategory); // update customer

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *     summary: Delete existing category
 *     description: Delete existing category, by primary key.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 'the category id'
 *     responses:
 *       200:
 *         description: 'category is deleted'
 */

router.delete('/categories/:categoryId', categoryController.deleteCategory); //delete customer

export default router;
