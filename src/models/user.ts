import { Model, UUIDV4 } from 'sequelize';

//Interfaz defina los atributos necesarios que debe tener un registro en la tabla User
interface UserAttributes{
  idUser:string,
  nameUser:string,
  emailUser:string,
  passwordUser:string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    
    idUser!: string;
    nameUser!: string;
    emailUser!: string;
    passwordUser!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      User.belongsToMany(models.Project,{
        through:'ProjectAssigments'
      })
    }
  }
  User.init({
    //Definición de las caracteristicas de los atributos en la tabla
    idUser:{
      type:DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    nameUser:{
      type:DataTypes.STRING,
      allowNull:false
    },
    emailUser:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    passwordUser:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};