import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ProjectAsset extends Model {
    static associate(models) {
      this.belongsTo(models.Project, {
        as: 'project',
      });
    }
  }

  ProjectAsset.init(
    {
      caption: DataTypes.TEXT,
      type: DataTypes.STRING,
      reference: DataTypes.STRING,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProjectAsset',
    },
  );

  return ProjectAsset;
};
