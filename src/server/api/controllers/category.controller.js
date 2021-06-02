// /**
//  * All the CRUD endpoint actions together
//  */
// import database from '../../config/ormConfig.js';
// const Database = await (database).getRepository('Category');
// const DbProducts = await (database).getRepository('products');
// const DbProductsHasCategories = await (database).getRepository('products_has_categories');

//  export const getCategory = async (req, res) => {
//    try {
//      res.status(200).json({ category: await Database.find() });
//    } catch({ message }) {
//      res.status(500);
//      res.json({ error: message });
//    }
//  };

 
//  export const addCategory = async (req, res) => {
//      try {
//          res.status(201).json({ category: await Database.save( req.body ) });
//         } catch({ message }) {
//             res.status(500).json({ error: message });
//         }
//     };
    
//     export const updateCategory = async (req, res) => {
//         try {
//             const id = req.params.categoriesId;
//             res.status(200).json({ category: await Database.update({id},  req.body ) });
//         }
//         catch({ message }) {
//             res.status(500).json({ error: message });
//         }
//     };
    
//     export const deleteCategory = async (req, res) => {
//         try {
//             const id = req.params.categoriesId;
//             await Database.delete({id});
//             res.status(204).end();
//         }
//         catch({ message }) {
//             res.status(500).json({ error: message });
//         }
//     };

//     export const getCategoryById = async (req, res) => {
//        try {
//            const id = req.params.categoriesId;
//          res.status(200).json({ category: await Database.findOne({ id }) });
//        } catch({ message }) {
//          res.status(500);
//          res.json({ error: message });
//        }
//      };
    
//     export const getCategoryByIdAndproducts = async (req, res) => {
//         try {
//             //find category
//             const id = req.params.categoriesId;
//             let category = await Database.findOne({id})
//             //find products from jointable for this category
//             let products = await DbProductsHasCategories.find({where: {category_id: id }, select: ['product_id']})
//             products.map(product => {return product.id = product.product_id, delete product.product_id })
//             //find reviews from TBLcategories
//             category.products = await DbProducts.find({where : [...products]})
//             res.status(200).json({ categoryData: category});
//         } catch({ message }) {
//             res.status(500);
//             res.json({ error: message });
//         }
//     };

    