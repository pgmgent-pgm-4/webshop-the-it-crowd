/**
 * All the CRUD endpoint actions together
 */

 import parseOrder from './parseOrder.js';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getOrder = async (order, request, response) => {
   try {
     response.status(200).json({ order: await order.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };

 export const getOrderById = async (order, request, response) => {
    try {
        const id = request.params.ordersId;
      response.status(200).json({ order: await order.findOne(id) });
    } catch({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  };
 
 export const addOrder = async (order, request, response) => {
   try {
     const { user_id, products } = parseOrder(request, response);
     const create_date = new Date().toLocaleDateString();
     const newOrder = await order.add( user_id, products );
     response.status(201).json({ order: newOrder });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };

 export const updateOrder = async (order, request, response) => {
   try {
     const {  user_id, products } = parseOrder(request);
     const id = request.params.ordersId;
     
     const updatedOrder = await order.update(id, user_id, products);
     response.status(200).json({ order: updatedOrder });
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const deleteOrder = async (order, request, response) => {
   try {
    const id = request.params.ordersId;
     await order.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };