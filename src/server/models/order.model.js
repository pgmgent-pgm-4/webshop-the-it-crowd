import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Order extends Model {
    static associate(models) {
        this.belongsTo(models.Profile, { foreignKey: 'profileId', constraints: false });
        this.hasMany(models.Payment, {
            as: 'payment',
            foreignKey: 'orderId',
            constraints: false
        });
        this.hasMany(models.OrderProduct, {
            as: 'OrderProduct',
            foreignKey: 'orderId' ,
            constraints: false
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
      tableName: 'Order',
    },
  );

  return Order;
};
