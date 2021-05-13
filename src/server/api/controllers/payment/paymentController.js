/**
 * All the CRUD endpoint actions together
 */

 import parsePayment from './parsePayment.js';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';

 dotenv.config();

 export const getPayment = async (payment, request, response) => {
   try {
     response.status(200).json({ payment: await payment.get() });
   } catch({ message }) {
     response.status(500);
     response.json({ error: message });
   }
 };

 export const getPaymentById = async (payment, request, response) => {
    try {
        const id = request.params.paymentsId;
      response.status(200).json({ payment: await payment.findOne(id) });
    } catch({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  };
 
 export const addPayment = async (payment, request, response) => {
   try {
     const { user_id, order_id } = parsePayment(request, response);
     const create_date = new Date().toLocaleDateString();
     const newPayment = await payment.add( user_id, order_id );
     response.status(201).json({ payment: newPayment });
   } catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const updatePayment = async (payment, request, response) => {
   try {
     const { user_id, order_id } = parsePayment(request);
     const id = request.params.paymentsId;
     
     const updatedPayment = await payment.update(id, user_id, order_id);
     response.status(200).json({ payment: updatedPayment });
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };
 
 export const deletePayment = async (payment, request, response) => {
   try {
    const id = request.params.paymentsId;
     await payment.delete(id);
     response.status(204).end();
   }
   catch({ message }) {
     response.status(500).json({ error: message });
   }
 };