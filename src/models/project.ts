
import { Model } from 'sequelize';

interface ProjectAttributes{
  idProject:number,
  titleProject:string,
  statusProject:string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    
    idProject!: number;
    titleProject!: string;
    statusProject!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      Project.belongsToMany(models.User,{
        through:'ProjectAssigments'
      })
    }
  }
  Project.init({
    idProject:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    titleProject:{
      type:DataTypes.STRING,
      allowNull:false
    },
    statusProject:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};