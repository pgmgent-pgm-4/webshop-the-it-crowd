/**
 * All the CRUD endpoint actions together
 */

 import database from '../../config/ormConfig.js';
 const Database = await (await database).getRepository('Payment');

 export const getPayment = async (res, req) => {
   try {
     res.status(200).json({ paymentData: await Database.get() });
   } catch({ message }) {
     res.status(500);
     res.json({ error: message });
   }
 };

 export const getPaymentById = async (res, req) => {
    try {
        const id = req.params.paymentsId;
      res.status(200).json({ paymentData: await Database.findOne({id}) });
    } catch({ message }) {
      res.status(500);
      res.json({ error: message });
    }
  };
 
 export const addPayment = async (res, req) => {
   try {
    req.body.createdAt = new Date.now();
     res.status(201).json({ paymentData: await Database.add(req.body) });
   } catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const updatePayment = async (res, req) => {
   try {
     const id = req.params.paymentsId;
    req.body.modifiedAt = new Date.now();
     res.status(200).json({ paymentData: await Database.update({id}, req.body) });
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };
 
 export const deletePayment = async (res, req) => {
   try {
    const id = req.params.paymentsId;
     await Database.delete({id});
     res.status(204).end();
   }
   catch({ message }) {
     res.status(500).json({ error: message });
   }
 };