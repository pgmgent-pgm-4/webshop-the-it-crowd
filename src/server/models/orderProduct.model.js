import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class OrderProduct extends Model {
    static associate(models) {
      this.hasOne(models.User, {
        as: 'user',
        foreignKey: 'profileId',
      });
    }
  }

  OrderProduct.init(
    {
        productPrice: DataTypes.FLOAT,
        productAmount: DataTypes.FLOAT,

       
    },
    {
      sequelize,
      modelName: 'OrderProduct',
    },
  );

  return OrderProduct;
};
