/**
 * All the CRUD endpoint actions together
 */
 import database from '../../config/ormConfig.js';
 const Database = await (database).getRepository('Product');
 const DbProductsHasCategories = await (database).getRepository('products_has_categories');
 const DbCategories = await (database).getRepository('categories');

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
        let addedProduct = await Database.save( product )

        //add categories to relational table 'many-to-many' -> TBL:products_has_categories
        if (categories !== null) {
            categories.forEach(async (cat) => {
                await DbProductsHasCategories.save({product_id: addedProduct.id, category_id: cat})
            });
        } 
        res.status(201).json({ productData: addedProduct });
        } catch({ message }) {
            res.status(500).json({ error: message });
        }
    };
    
    export const updateProduct = async (req, res) => {
        try {
        const id = req.params.productId;
        let {product, categories} = req.body;

        product.modifiedAt = Date.now();
        let updatedProduct = await Database.update( {id}, product )

        //add categories to relational table 'many-to-many' -> TBL:products_has_categories
        if (categories !== null) {
            //delete existing categories
            await DbProductsHasCategories.delete({product_id: id})
            //add categories to join table
            categories.forEach(async (cat) => {
                await DbProductsHasCategories.save({product_id: id, category_id: cat})
            });
        } 
            res.status(201).json({ productData: updatedProduct });
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
         res.status(200).json({ productData: await Database.findOne({id})});
       } catch({ message }) {
         res.status(500);
         res.json({ error: message });
       }
     };

     export const getProductByIdAndCategories = async (req, res) => {
        try {
            //find product
            const id = req.params.productsId;
            let product = await Database.findOne({id})
            //find categories from jointable for this product
            let categories = await DbProductsHasCategories.find({where: {product_id: id }, select: ['category_id']})
            categories.map(cat => {return cat.id = cat.category_id, delete cat.category_id })
            //find categories from TBLcategories
            product.categories = await DbCategories.find({where : [...categories]})
          res.status(200).json({ productData: product});
        } catch({ message }) {
          res.status(500);
          res.json({ error: message });
        }
      };
