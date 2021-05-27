/**
 * All the CRUD endpoint actions together
 */
import database from '../../config/ormConfig.js';
const Database = await (database).getRepository('Category');

 export const getCategory = async (req, res) => {
   try {
     res.status(200).json({ category: await Database.find() });
   } catch({ message }) {
     res.status(500);
     res.json({ error: message });
   }
 };

 export const getCategoryById = async (req, res) => {
    try {
        const id = req.params.categoriesId;
      res.status(200).json({ category: await Database.findOne({ id }) });
    } catch({ message }) {
      res.status(500);
      res.json({ error: message });
    }
  };
 
 export const addCategory = async (req, res) => {
   try {
     res.status(201).json({ category: await Database.save( req.body ) });
   } catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const updateCategory = async (req, res) => {
   try {
        const id = req.params.categoriesId;
        res.status(200).json({ category: await Database.update({id},  req.body ) });
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const deleteCategory = async (req, res) => {
   try {
    const id = req.params.categoriesId;
     await Database.delete({id});
     res.status(204).end();
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };