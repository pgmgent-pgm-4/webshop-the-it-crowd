import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Payment extends Model {
    static associate(models) {
        this.belongsTo(models.Profile, { foreignKey: 'profileId', constraints: false });
        this.belongsTo(models.Order, { foreignKey: 'orderId', constraints: false });
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
      tableName: 'Payment',
    },
  );

  return Payment;
};
