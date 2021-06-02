// /**
//  * All the CRUD endpoint actions together
//  */

//  import database from '../../config/ormConfig.js';
//  const Database = await (database).getRepository('User');
//  const DbReviews = await (database).getRepository('reviews');
//  const DbOrders = await (database).getRepository('orders');
//  const DbProfiles = await (database).getRepository('profiles');
//  const DbPayments = await (database).getRepository('payments');

//  import bcrypt from 'bcrypt';
//  import dotenv from 'dotenv';

//  dotenv.config();

//  export const getUser = async (req, res) => {
//    try {
//      res.status(200).json({ user: await Database.find() });
//    } catch({ message }) {
//      res.status(500);
//      res.json({ error: message });
//    }
//  };

//  export const getUserById = async (req, res) => {
//     try {
//         const id = req.params.usersId;
//       res.status(200).json({ user: await Database.findOne({id}) });
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };
 
//  export const addUser = async (req, res) => {
//    try {
//     req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
//     req.body.createdAt = new Date.now();
//      res.status(201).json({ user: await Database.save( req.body ) });
//    } catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };
 
//  export const updateUser = async (req, res) => {
//    try {
//      const id = req.params.usersId;
//      req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
//      req.body.modifiedAt = new Date.now();
//      res.status(200).json({ user: await Database.update( {id}, req.body ) });
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };
 
//  export const deleteUser = async (req, res) => {
//    try {
//      const id = req.params.usersId;
//      await Database.delete({id});
//      res.status(204).end();
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };

//  export const getUserByIdAndReviews = async (req, res) => {
//     try {
//         //find product
//         const id = req.params.usersId;
//         let user = await Database.findOne({id})
//         //find reviews from TBLreviews
//         user.reviews = await DbReviews.find({where : {user_id: id}})
//       res.status(200).json({ userData: user});
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };

//   export const getUserByIdAndProfiles = async (req, res) => {
//     try {
//         //find product
//         const id = req.params.usersId;
//         let user = await Database.findOne({id})
//         //find reviews from TBLreviews
//         user.profiles = await DbProfiles.find({where : {user_id: id}})
//       res.status(200).json({ userData: user});
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };

//   export const getUserByIdAndOrders = async (req, res) => {
//     try {
//         //find product
//         const id = req.params.usersId;
//         let user = await Database.findOne({id})
//         //find reviews from TBLreviews
//         user.orders = await DbOrders.find({where : {user_id: id}})
//       res.status(200).json({ userData: user});
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };
  
//   export const getUserByIdAndPayments = async (req, res) => {
//     try {
//         //find product
//         const id = req.params.usersId;
//         let user = await Database.findOne({id})
//         //find reviews from TBLreviews
//         user.payments = await DbPayments.find({where : {user_id: id}})
//       res.status(200).json({ userData: user});
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };