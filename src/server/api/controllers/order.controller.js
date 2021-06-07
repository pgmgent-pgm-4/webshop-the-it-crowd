// /**
//  * All the CRUD endpoint actions together
//  */
//  import database from '../../config/ormConfig.js';
//  const Database = await (database).getRepository('Order');
//  const DbOrderProducts = await (database).getRepository('order_products');
//  const DbProducts = await (database).getRepository('products');
//  const DbPayments = await (database).getRepository('payments');

//  export const getOrder = async (req, res) => {
//    try {
//      res.status(200).json({ orderData: await Database.find() });
//    } catch({ message }) {
//      res.status(500);
//      res.json({ error: message });
//    }
//  };

//  export const getOrderById = async (req, res) => {
//     try {
//         const id = req.params.ordersId;
//       res.status(200).json({ orderData: await Database.findOne({id}) });
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };
 
//  export const addOrder = async (req, res) => {
//    try {
//     req.body.createdAt = new Date.now();
//      res.status(201).json({ orderData: await Database.save(req.body) });
//    } catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };

//  export const updateOrder = async (req, res) => {
//    try {
//      const id = req.params.ordersId;
//      res.status(200).json({ orderData: await Database.update({id}, req.body) });
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };
 
//  export const deleteOrder = async (req, res) => {
//    try {
//     const id = req.params.ordersId;
//      await Database.delete({id});
//      res.status(204).end();
//    }
//    catch({ message }) {
//      res.status(500).json({ error: message });
//    }
//  };

//  export const getOrderByIdAndProducts = async (req, res) => {
//     try {
//         //find product
//         const id = req.params.ordersId;
//         let order = await Database.findOne({id})
//         //find products from jointable
//         let products = await DbOrderProducts.find({where : {order_id: id}})
//         for (let i = 0; i < products.length; i++) {
//             const product = products[i];
//             product.detail = await DbProducts.findOne({where : {id: product.product_id}})
//         }
//         order.products = products
//       res.status(200).json({ orderData: order});
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };

//   export const getOrderByIdAndPayments = async (req, res) => {
//     try {
//         //find product
//         const id = req.params.ordersId;
//         let order = await Database.findOne({id})
//         //find reviews from TBLreviews
//         order.payments = await DbPayments.find({where : {order_id: id}})
//       res.status(200).json({ orderData: order});
//     } catch({ message }) {
//       res.status(500);
//       res.json({ error: message });
//     }
//   };