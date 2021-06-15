import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: 'ProductsHasTags',
        as: 'product',
        foreignKey: 'productId',
      });
    }
  }

  Tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tag',
      tableName: 'Tag',
    },
  );

  return Tag;
};
