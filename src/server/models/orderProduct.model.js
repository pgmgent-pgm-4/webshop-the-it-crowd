import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class OrderProduct extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { 
        foreignKey: 'productId',
        constraints: false
    });
    this.belongsTo(models.Order, { 
        foreignKey: 'orderId',
        constraints: false
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
      tableName: 'OrderProduct',
    },
  );

  return OrderProduct;
};
