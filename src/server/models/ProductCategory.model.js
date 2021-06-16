import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ProductCategory extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        as: 'category',
        constraints: false
      });
      this.belongsTo(models.Product, {
        as: 'product',
        constraints: false
      });
    }
  }

  ProductCategory.init(
    {

    },
    {
      sequelize,
      modelName: 'ProductCategory',
      tableName: 'ProductCategory',
    },
  );

  return ProductCategory;
};
