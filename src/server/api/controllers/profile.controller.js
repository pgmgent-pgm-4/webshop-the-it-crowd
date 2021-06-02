// /**
//  * All the CRUD endpoint actions together
//  */
//  import database from '../../config/ormConfig.js';
//  const Database = await (database).getRepository('Profile');

//  export const getProfile = async (req, res) => {
//    try {
//      res.status(200).json({ profile: await Database.find() });
//    } catch({ message }) {
//      res.status(500);
//      res.json({ error: message });
//    }
//  };

//  export const getProfileById = async (req, res) => {
//     try {
//         const id = req.params.profilesId;
//       res.status(200).json({ profile: await Database.findOne({id}) });
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };
 
//  export const addProfile = async (req, res) => {
//    try {
// req.body.createdAt = new Date.now();

//      res.status(201).json({ profile:  await Database.save( req.body ) });
//    } catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };

//  export const updateProfile = async (req, res) => {
//    try {
// req.body.modifiedAt = new Date.now();
//     const id = req.params.profilesId;
//      res.status(200).json({ profile: await Database.update({id}, req.body) });
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };
 
//  export const deleteProfile = async (req, res) => {
//    try {
//     const id = req.params.profilesId;
//      await Database.delete({id});
//      res.status(204).end();
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };