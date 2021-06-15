import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Promotion extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { 
          foreignKey: 'productId',
          constraints: false
     });
    }
  }

  Promotion.init(
    {
      promoCode: DataTypes.INTEGER,
      value: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Promotion',
      tableName: 'Promotion',
    },
  );

  return Promotion;
};
