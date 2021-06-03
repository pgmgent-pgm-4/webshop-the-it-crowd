import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class OrderProduct extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { 
        foreignKey: 'productId'
    });
    this.belongsTo(models.Order, { 
        foreignKey: 'orderId'
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
