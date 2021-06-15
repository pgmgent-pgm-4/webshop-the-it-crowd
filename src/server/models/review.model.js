import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Review extends Model {
    static associate(models) {
    this.belongsTo(models.Profile, { foreignKey: 'profileId', constraints: false });
    this.belongsTo(models.Product, { 
        foreignKey: 'productId', 
        constraints: false
   });
    }
  }

  Review.init(
    {
      score: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'Review',
    },
  );

  return Review;
};
