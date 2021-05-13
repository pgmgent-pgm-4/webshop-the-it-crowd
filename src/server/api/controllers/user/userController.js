/**
 * All the CRUD endpoint actions together
 */

 import parseUser from './parseUser.js';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getUser = async (user, request, response) => {
   try {
     response.status(200).json({ user: await user.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };

 export const getUserById = async (user, request, response) => {
    try {
        const id = request.params.usersId;
      response.status(200).json({ user: await user.findOne(id) });
    } catch({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  };
 
 export const addUser = async (user, request, response) => {
   try {
     const { username, userpwd, email } = parseUser(request, response);
     const hashedPasswrd = await bcrypt.hash(userpwd, parseInt(process.env.BCRYPT_SALT_ROUND));
     const create_date = new Date().toLocaleDateString();
     const newUser = await user.add( username, hashedPasswrd, email, create_date );
     response.status(201).json({ user: newUser });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const updateUser = async (user, request, response) => {
   try {
     const { username, userpwd, email } = parseUser(request);
     const id = request.params.usersId;
     const hashedPasswrd = await bcrypt.hash(userpwd, parseInt(process.env.BCRYPT_SALT_ROUND));
     
     const updatedUser = await user.update(id, username, hashedPasswrd, email);
     response.status(200).json({ user: updatedUser });
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const deleteUser = async (user, request, response) => {
   try {
     const id = request.params.usersId;
     await user.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };