import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Project, {
        through: 'ProjectsHasTags',
        as: 'projects',
        foreignKey: 'projectId',
      });
    }
  }

  Tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tag',
    },
  );

  return Tag;
};
