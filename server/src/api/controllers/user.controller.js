/**
 * All the CRUD endpoint actions together
 */

 import database from '../../config/ormConfig.js';
 const Database = await (await database).getRepository('User');

 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getUser = async (res, req) => {
   try {
     res.status(200).json({ user: await Database.get() });
   } catch({ message }) {
     res.status(500);
     res.json({ error: message });
   }
 };

 export const getUserById = async (res, req) => {
    try {
        const id = req.params.usersId;
      res.status(200).json({ user: await Database.findOne({id}) });
    } catch({ message }) {
      res.status(500);
      res.json({ error: message });
    }
  };
 
 export const addUser = async (res, req) => {
   try {
    req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
    req.body.createdAt = new Date.now();
     res.status(201).json({ user: await Database.add( req.body ) });
   } catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const updateUser = async (res, req) => {
   try {
     const id = req.params.usersId;
     req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
     req.body.modifiedAt = new Date.now();
     res.status(200).json({ user: await Database.update( {id}, req.body ) });
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const deleteUser = async (res, req) => {
   try {
     const id = req.params.usersId;
     await Database.delete({id});
     res.status(204).end();
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };