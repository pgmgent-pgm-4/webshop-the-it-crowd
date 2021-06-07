import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.ProductCategory, {
        as: 'ProductCategory',
        foreignKey: 'categoryId',
      });
    }
  }

  Category.init(
    {
      name: {
          type: DataTypes.STRING
        },
      description: {
          type: DataTypes.TEXT
        },
        subCategory: {
            type: DataTypes.STRING
        }
    },
    {
      sequelize,
      modelName: 'Category', 
    },
  );

  return Category;
};
