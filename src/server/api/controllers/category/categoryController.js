/**
 * All the CRUD endpoint actions together
 */

 import parseCategory from './parseCategory.js';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getCategory = async (category, request, response) => {
   try {
     response.status(200).json({ category: await category.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };

 export const getCategoryById = async (category, request, response) => {
    try {
        const id = request.params.categoriesId;
      response.status(200).json({ category: await category.findOne(id) });
    } catch({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  };
 
 export const addCategory = async (category, request, response) => {
   try {
     const { name, description } = parseCategory(request, response);
     const create_date = new Date().toLocaleDateString();
     const newCategory = await category.add( name, description );
     response.status(201).json({ category: newCategory });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const updateCategory = async (category, request, response) => {
   try {
     const { name, description } = parseCategory(request);
     const id = request.params.categoriesId;
     
     const updatedCategory = await category.update(id,  name, description );
     response.status(200).json({ category: updatedCategory });
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const deleteCategory = async (category, request, response) => {
   try {
    const id = request.params.categoriesId;
     await category.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };