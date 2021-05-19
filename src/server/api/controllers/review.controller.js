/**
 * All the CRUD endpoint actions together
 */

 import database from '../../config/ormConfig.js';
 const Database = await (await database).getRepository('Review');


 export const getReview = async (res, req) => {
   try {
     res.status(200).json({ review: await Database.get() });
   } catch({ message }) {
     res.status(500);
     res.json({ error: message });
   }
 };

 export const getReviewById = async (res, req) => {
    try {
        const id = req.params.reviewsId;
      res.status(200).json({ review: await Database.findOne({id}) });
    } catch({ message }) {
      res.status(500);
      res.json({ error: message });
    }
  };
 
 export const addReview = async (res, req) => {
   try {
     req.body.createdAt = new Date.now();
     res.status(201).json({ review: await Database.save(req.body) });
   } catch({ message }) {
     res.status(500).json({ error: message });
   }
 };

 export const updateReview = async (res, req) => {
   try {
     const id = req.params.reviewsId;
     req.body.modifiedAt = new Date.now();
     res.status(201).json({ review: await Database.update({id}, req.body) });
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const deleteReview = async (res, req) => {
   try {
    const id = req.params.reviewsId;
     await Database.delete({id});
     res.status(204).end();
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };