/**
 * All the CRUD endpoint actions together
 */

 import parseProduct from './parseProduct.js';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getProduct = async (product, request, response) => {
   try {
     response.status(200).json({ product: await product.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };

 export const getProductById = async (product, request, response) => {
    try {
        const id = request.params.productsId;
      response.status(200).json({ product: await product.findOne(id) });
    } catch({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  };
 
 export const addProduct = async (product, request, response) => {
   try {
     const {  title, price, synopsis, description, tags } = parseProduct(request, response);
     const newProduct = await product.add(  title, price, synopsis, description, JSON.stringify(tags) );
     response.status(201).json({ product: newProduct });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };

 export const updateProduct = async (product, request, response) => {
   try {
     const { title, price, synopsis, description, tags } = parseProduct(request);
     const id = request.params.productsId;
     
     const updatedProduct = await product.update(id, title, price, synopsis, description, tags);
     response.status(200).json({ product: updatedProduct });
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const deleteProduct = async (product, request, response) => {
   try {
    const id = request.params.productsId;
     await product.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };