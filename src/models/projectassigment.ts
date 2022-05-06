'use strict';
import {Model} from 'sequelize';

interface ProjectAssigmentAttributes{
  ProjectId: number;
  UserId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectAssigment extends Model<ProjectAssigmentAttributes> implements ProjectAssigmentAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    ProjectId!: number;
    UserId!: string;
    static associate(models: any) {
      // define association here
    }
  }
  ProjectAssigment.init({
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Project',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'awsCognitoId'
      }
    }
  }, {
    sequelize,
    modelName: 'ProjectAssigment',
  });
  return ProjectAssigment;
};