import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Order extends Model {
    static associate(models) {
      this.hasOne(models.User, {
        as: 'user',
        foreignKey: 'profileId',
      });
    }
  }

  Order.init(
    {
        orderState: DataTypes.INTEGER,
       
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );

  return Order;
};
