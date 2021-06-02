import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Profile extends Model {
    static associate(models) {
      this.hasOne(models.User, {
        as: 'user',
        foreignKey: 'profileId',
      });
    }
  }

  Profile.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );

  return Profile;
};
