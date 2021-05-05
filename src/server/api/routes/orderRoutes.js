   /**
 * Registering the ToDo API endpoints
 */
    import express from 'express';
    import orderDb from '../model/order/OrderDb.js';
    const orderData = new orderDb(); //Create an instance of userDb
    
    import {
        getOrder,
        addOrder,
        updateOrder,
        deleteOrder
    } from '../controllers/order/orderController.js';
    
    /**
     * Make a Router
     */
    const router = express.Router();
    
    /**
     * Router for customers
     */
    router.get('/orders', async (req, res) => await getOrder(orderData, req, res)); // get customers
    router.post('/orders', async (req, res) => await addOrder(orderData, req, res)); //add customers
    router.put('/orders/:id', async (req, res) => await updateOrder(orderData, req, res)); // update customer
    router.delete('/orders/:id', async (req, res) => await deleteOrder(orderData, req, res)); //delete customer
   
    export default router;