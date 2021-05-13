/**
 * All the CRUD endpoint actions together
 */

 import parseProfile from './parseProfile.js';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getProfile = async (profile, request, response) => {
   try {
     response.status(200).json({ profile: await profile.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };

 export const getProfileById = async (profile, request, response) => {
    try {
        const id = request.params.profilesId;
      response.status(200).json({ profile: await profile.findOne(id) });
    } catch({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  };
 
 export const addProfile = async (profile, request, response) => {
   try {
     const { firstName, lastName, photo, dob, address1, address2, country, city, zipCode, user_id } = parseProfile(request, response);
     const createdAt = new Date().toLocaleDateString();
     const newProfile = await profile.add( firstName, lastName, photo, dob, address1, address2, country, city, zipCode, createdAt, user_id );
     response.status(201).json({ profile: newProfile });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };

 export const updateProfile = async (profile, request, response) => {
   try {
     const { firstName, lastName, photo, dob, address1, address2, country, city, zipCode, user_id } = parseProfile(request);
     const id = request.params.profilesId;
     
     const updatedProfile = await profile.update(id, firstName, lastName, photo, dob, address1, address2, country, city, zipCode, user_id);
     response.status(200).json({ profile: updatedProfile });
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const deleteProfile = async (profile, request, response) => {
   try {
    const id = request.params.profilesId;
     await profile.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };