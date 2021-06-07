import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Order extends Model {
    static associate(models) {
        this.belongsTo(models.Profile, { foreignKey: 'profileId' });
        this.hasMany(models.Payment, {
            as: 'payment',
            foreignKey: 'orderId' 
        });
        this.hasMany(models.OrderProduct, {
            as: 'OrderProduct',
            foreignKey: 'orderId' 
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
