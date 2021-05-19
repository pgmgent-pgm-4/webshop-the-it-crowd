/**
 * All the CRUD endpoint actions together
 */
 import database from '../../config/ormConfig.js';
 const Database = await (await database).getRepository('Profile');

 export const getProfile = async (res, req) => {
   try {
     res.status(200).json({ profile: await Database.get() });
   } catch({ message }) {
     res.status(500);
     res.json({ error: message });
   }
 };

 export const getProfileById = async (res, req) => {
    try {
        const id = req.params.profilesId;
      res.status(200).json({ profile: await Database.findOne({id}) });
    } catch({ message }) {
      res.status(500);
      res.json({ error: message });
    }
  };
 
 export const addProfile = async (res, req) => {
   try {
req.body.createdAt = new Date.now();

     res.status(201).json({ profile:  await Database.add( req.body ) });
   } catch({ message }) {
     res.status(500).json({ error: message });
   }
 };

 export const updateProfile = async (res, req) => {
   try {
req.body.modifiedAt = new Date.now();
    const id = req.params.profilesId;
     res.status(200).json({ profile: await Database.update({id}, req.body) });
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const deleteProfile = async (res, req) => {
   try {
    const id = req.params.profilesId;
     await Database.delete({id});
     res.status(204).end();
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };