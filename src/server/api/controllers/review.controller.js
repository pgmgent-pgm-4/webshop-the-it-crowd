// /**
//  * All the CRUD endpoint actions together
//  */

//  import database from '../../config/ormConfig.js';
//  const Database = await (database).getRepository('Review');


//  export const getReview = async (req, res) => {
//    try {
//      res.status(200).json({ review: await Database.find() });
//    } catch({ message }) {
//      res.status(500);
//      res.json({ error: message });
//    }
//  };

//  export const getReviewById = async (req, res) => {
//     try {
//         const id = req.params.reviewsId;
//       res.status(200).json({ review: await Database.findOne({id}) });
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };
 
//  export const addReview = async (req, res) => {
//    try {
//      req.body.createdAt = new Date.now();
//      res.status(201).json({ review: await Database.save(req.body) });
//    } catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };

//  export const updateReview = async (req, res) => {
//    try {
//      const id = req.params.reviewsId;
//      req.body.modifiedAt = new Date.now();
//      res.status(201).json({ review: await Database.update({id}, req.body) });
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };
 
//  export const deleteReview = async (req, res) => {
//    try {
//     const id = req.params.reviewsId;
//      await Database.delete({id});
//      res.status(204).end();
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };