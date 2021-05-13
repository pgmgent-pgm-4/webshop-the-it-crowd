/**
 * All the CRUD endpoint actions together
 */

 import parsePromotion from './parsePromotion.js';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getPromotion = async (promotion, request, response) => {
   try {
     response.status(200).json({ promotion: await promotion.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };

 export const getPromotionById = async (promotion, request, response) => {
    try {
        const id = request.params.promotionsId;
      response.status(200).json({ promotion: await promotion.findOne(id) });
    } catch({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  };
 
 export const addPromotion = async (promotion, request, response) => {
   try {
     const { title,promoCode,active,value,type } = parsePromotion(request, response);
     const create_date = new Date().toLocaleDateString();
     const newPromotion = await promotion.add( title,promoCode,active,value,type );
     response.status(201).json({ promotion: newPromotion });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const updatePromotion = async (promotion, request, response) => {
   try {
     const { title,promoCode,active,value,type } = parsePromotion(request);
     const id = request.params.promotionsId;
     
     const updatedPromotion = await promotion.update(id, title,promoCode,active,value,type);
     response.status(200).json({ promotion: updatedPromotion });
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const deletePromotion = async (promotion, request, response) => {
   try {
    const id = request.params.promotionsId;
     await promotion.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };