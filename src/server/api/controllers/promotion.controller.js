// /**
//  * All the CRUD endpoint actions together
//  */

//  import database from '../../config/ormConfig.js';
//  const Database = await (database).getRepository('Promotion');

//  export const getPromotion = async (req, res) => {
//    try {
//      res.status(200).json({ promotion: await Database.find() });
//    } catch({ message }) {
//      res.status(500);
//      res.json({ error: message });
//    }
//  };

//  export const getPromotionById = async (req, res) => {
//     try {
//         const id = req.params.promotionsId;
//       res.status(200).json({ promotion: await Database.findOne({id}) });
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };
 
//  export const addPromotion = async (req, res) => {
//    try {
//        req.body.createdAt = new Date.now();
//      res.status(201).json({ promotion: await Database.save( req.body ) });
//    } catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };
 
//  export const updatePromotion = async (req, res) => {
//    try {
//      const id = req.params.promotionsId;
//     req.body.modifiedAt = new Date.now();
//      res.status(200).json({ promotion: await Database.update({id}, req.body) });
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };
 
//  export const deletePromotion = async (req, res) => {
//    try {
//     const id = req.params.promotionsId;
//      await Database.delete({id});
//      res.status(204).end();
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };