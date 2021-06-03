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
      photo: DataTypes.STRING,
      dob: DataTypes.INTEGER,
      street: DataTypes.CHAR,
      streetNr: DataTypes.CHAR,
      country: DataTypes.CHAR,
      city: DataTypes.CHAR,
      zipCode: DataTypes.CHAR,
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );

  return Profile;
};
