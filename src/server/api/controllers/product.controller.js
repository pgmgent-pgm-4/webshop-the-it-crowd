/**
 * All the CRUD endpoint actions together
 */
 import database from '../../config/ormConfig.js';
 const Database = await (await database).getRepository('Product');

 export const getProduct = async (req, res) => {
   try {
     res.status(200).json({ productData: await Database.find() });
   } catch({ message }) {
     res.status(500);
     res.json({ error: message });
   }
 };

 export const addProduct = async (req, res) => {
     try {
        let {product, categories} = req.body;

        product.createdAt = Date.now();      
        res.status(201).json({ productData: await Database.save(  product ) });
        } catch({ message }) {
            res.status(500).json({ error: message });
        }
    };
    
    export const updateProduct = async (req, res) => {
        try {
            const id = req.params.productId;
            req.body.modifiedAt = new Date.now()
            res.status(201).json({ productData: await Database.update( {id}, req.body ) });
        }
        catch({ message }) {
            res.status(500).json({ error: message });
        }
    };
    
    export const deleteProduct = async (req, res) => {
        try {
            const id = req.params.productsId;
            await Database.delete({id});
            res.status(204).end();
        }
        catch({ message }) {
            res.status(500).json({ error: message });
        }
    };

    export const getProductById = async (req, res) => {
       try {
           const id = req.params.productsId;
         res.status(200).json({ productData: await Database.findOne({id}) });
       } catch({ message }) {
         res.status(500);
         res.json({ error: message });
       }
     };
