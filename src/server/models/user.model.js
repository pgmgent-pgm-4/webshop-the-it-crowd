import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
        this.belongsTo(models.Profile, { foreignKey: 'profileId', constraints: false });
    }
  }

  User.init(
    {
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'User',
    },
  );

  return User;
};
