import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Payment extends Model {
    static associate(models) {
      this.hasOne(models.User, {
        as: 'user',
        foreignKey: 'profileId',
      });
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
