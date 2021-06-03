import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Promotion extends Model {
    static associate(models) {
      this.belongsTo(models.Profile, { foreignKey: 'profileId' });
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
    },
  );

  return Promotion;
};
