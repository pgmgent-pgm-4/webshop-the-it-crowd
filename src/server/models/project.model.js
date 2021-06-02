import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
      this.hasMany(models.ProjectAsset, {
        as: 'assets',
        foreignKey: 'projectId',
      });
      this.belongsToMany(models.Tag, {
        through: 'ProjectsHasTags',
        as: 'tags',
        foreignKey: 'tagId',
      });
    }
  }

  Project.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Project',
    },
  );

  return Project;
};
