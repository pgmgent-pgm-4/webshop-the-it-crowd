   /**
 * Registering the ToDo API endpoints
 */
    import express from 'express';
    import reviewDb from '../model/review/ReviewDb.js';
    const reviewData = new reviewDb(); //Create an instance of userDb
    
    import {
        getReview,
        addReview,
        updateReview,
        deleteReview
    } from '../controllers/review/reviewController.js';
    
    /**
     * Make a Router
     */
    const router = express.Router();
    
    /**
     * Router for customers
     */
    router.get('/reviews', async (req, res) => await getReview(reviewData, req, res)); // get customers
    router.post('/reviews', async (req, res) => await addReview(reviewData, req, res)); //add customers
    router.put('/reviews/:id', async (req, res) => await updateReview(reviewData, req, res)); // update customer
    router.delete('/reviews/:id', async (req, res) => await deleteReview(reviewData, req, res)); //delete customer
   
    export default router;