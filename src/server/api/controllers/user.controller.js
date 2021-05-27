/**
 * All the CRUD endpoint actions together
 */

 import database from '../../config/ormConfig.js';
 const Database = await (database).getRepository('User');

 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getUser = async (req, res) => {
   try {
     res.status(200).json({ user: await Database.find() });
   } catch({ message }) {
     res.status(500);
     res.json({ error: message });
   }
 };

 export const getUserById = async (req, res) => {
    try {
        const id = req.params.usersId;
      res.status(200).json({ user: await Database.findOne({id}) });
    } catch({ message }) {
      res.status(500);
      res.json({ error: message });
    }
  };
 
 export const addUser = async (req, res) => {
   try {
    req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
    req.body.createdAt = new Date.now();
     res.status(201).json({ user: await Database.save( req.body ) });
   } catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const updateUser = async (req, res) => {
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
 
 export const deleteUser = async (req, res) => {
   try {
     const id = req.params.usersId;
     await Database.delete({id});
     res.status(204).end();
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };