/**
 * All the CRUD endpoint actions together
 */
 import database from '../../config/ormConfig.js';
 const Database = await (await database).getRepository('Product');

 export const getProduct = async (res, req) => {
   try {
     res.status(200).json({ productData: await Database.get() });
   } catch({ message }) {
     res.status(500);
     res.json({ error: message });
   }
 };

 export const addProduct = async (res, req) => {
     try {
        req.body.createdAt = new Date.now()
         res.status(201).json({ productData: await Database.add(  req.body ) });
        } catch({ message }) {
            res.status(500).json({ error: message });
        }
    };
    
    export const updateProduct = async (res, req) => {
        try {
            const id = req.params.productId;
            req.body.modifiedAt = new Date.now()
            res.status(201).json({ productData: await Database.update( {id}, req.body ) });
        }
        catch({ message }) {
            res.status(500).json({ error: message });
        }
    };
    
    export const deleteProduct = async (res, req) => {
        try {
            const id = req.params.productsId;
            await Database.delete({id});
            res.status(204).end();
        }
        catch({ message }) {
            res.status(500).json({ error: message });
        }
    };

    export const getProductById = async (res, req) => {
       try {
           const id = req.params.productsId;
         res.status(200).json({ productData: await Database.findOne({id}) });
       } catch({ message }) {
         res.status(500);
         res.json({ error: message });
       }
     };
