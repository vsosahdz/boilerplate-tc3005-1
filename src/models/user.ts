'use strict';
import {Model} from 'sequelize';


interface UserAttributes {
  awsCognitoId:string;
  name:string;
  role:string;
  email:string;
}

export enum UserRoles {
	ADMIN = 'ADMIN',
	SUPERVISOR = 'SUPERVISOR',
  AGENT = 'AGENT',
	CUSTOMER = 'CUSTOMER',
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    awsCognitoId!: string;
    name!: string;
    role!: string;
    email!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      User.belongsToMany(models.Project,{
        through:'ProjectAssigment'
      })
    }
  }
  User.init({
    awsCognitoId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:UserRoles.CUSTOMER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true      
    }    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};