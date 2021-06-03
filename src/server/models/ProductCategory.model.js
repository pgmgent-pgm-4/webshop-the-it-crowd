import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ProductCategory extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        as: 'category'
      });
      this.belongsTo(models.Product, {
        as: 'product'
      });
    }
  }

  ProductCategory.init(
    {

    },
    {
      sequelize,
      modelName: 'ProductCategory',
    },
  );

  return ProductCategory;
};
