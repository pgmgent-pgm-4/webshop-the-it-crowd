import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Profile extends Model {
    static associate(models) {
      this.hasOne(models.User, {
        as: 'user',
        foreignKey: 'profileId',
        constraints: false
      });
      this.hasMany(models.Payment, {
        as: "payment", 
        foreignKey: 'profileId',
        constraints: false
    });
    this.hasMany(models.Review, {
        as: "review", 
        foreignKey: 'profileId',
        constraints: false
    });
    this.hasMany(models.Order, {
        as: "order", 
        foreignKey: 'profileId',
        constraints: false
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
      tableName: 'Profile',
    },
  );

  return Profile;
};
