import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Payment extends Model {
    static associate(models) {
        this.belongsTo(models.Profile, { foreignKey: 'profileId' });
        this.belongsTo(models.Order, { foreignKey: 'orderId' });
    }
  }

  Payment.init(
    {
        details: DataTypes.STRING,
        total: DataTypes.NUMBER,
       
    },
    {
      sequelize,
      modelName: 'Payment',
    },
  );

  return Payment;
};
