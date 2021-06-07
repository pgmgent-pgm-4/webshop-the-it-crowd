import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Review extends Model {
    static associate(models) {
    this.belongsTo(models.Profile, { foreignKey: 'profileId' });
    this.belongsTo(models.Product, { 
        foreignKey: 'productId'
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
    },
  );

  return Review;
};
