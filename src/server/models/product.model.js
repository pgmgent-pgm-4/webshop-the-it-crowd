import { Model, DataTypes, DECIMAL } from 'sequelize';

export default (sequelize) => {
  class Product extends Model {
    static associate(models) {
        this.hasMany(models.ProductCategory, { 
            as: 'ProductCategory',
            foreignKey: 'productId' ,
            constraints: false
            });
        this.hasMany(models.Promotion, { 
            as: 'promotion',
            foreignKey: 'productId',
            constraints: false
            });
        this.hasMany(models.OrderProduct, { 
            as: 'OrderProduct',
            foreignKey: 'productId' ,
            constraints: false
            });
        this.hasMany(models.Review, { 
            as: 'review',
            foreignKey: 'productId' ,
            constraints: false
            });
        this.belongsToMany(models.Tag, {
            through: 'ProductsHasTags',
            as: 'tag',
            foreignKey: 'tagId',
        });
    }
  }

  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      synopsis: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      photo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'Product',
    },
  );

  return Product;
};
