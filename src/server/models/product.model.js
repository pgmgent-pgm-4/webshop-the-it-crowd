import { Model, DataTypes, DECIMAL } from 'sequelize';

export default (sequelize) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
      this.belongsToMany(models.Tag, {
        through: 'ProductsHasTags',
        as: 'tags',
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

    },
    {
      sequelize,
      modelName: 'Product',
    },
  );

  return Product;
};
