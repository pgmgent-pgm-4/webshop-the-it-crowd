/**
 * All the CRUD endpoint actions together
 */
 import database from '../../config/ormConfig.js';
 const Database = await (database).getRepository('Order');

 export const getOrder = async (req, res) => {
   try {
     res.status(200).json({ orderData: await Database.find() });
   } catch({ message }) {
     res.status(500);
     res.json({ error: message });
   }
 };

 export const getOrderById = async (req, res) => {
    try {
        const id = req.params.ordersId;
      res.status(200).json({ orderData: await Database.findOne({id}) });
    } catch({ message }) {
      res.status(500);
      res.json({ error: message });
    }
  };
 
 export const addOrder = async (req, res) => {
   try {
    req.body.createdAt = new Date.now();
     res.status(201).json({ orderData: await Database.save(req.body) });
   } catch({ message }) {
     res.status(500).json({ error: message });
   }
 };

 export const updateOrder = async (req, res) => {
   try {
     const id = req.params.ordersId;
     res.status(200).json({ orderData: await Database.update({id}, req.body) });
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const deleteOrder = async (req, res) => {
   try {
    const id = req.params.ordersId;
     await Database.delete({id});
     res.status(204).end();
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };