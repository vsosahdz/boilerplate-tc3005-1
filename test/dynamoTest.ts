//import dynamodb from 'dynamodb';
//import Joi from 'joi';
const dynamodb = require("dynamodb");
const Joi = require('joi');

//Configuración del SDK en nodejs para poder trabajar con la nube llenar credenciales
dynamodb.AWS.config.update({
    accessKeyId:"",
    secretAccessKey:"",
    //unicamente necesario con el learner lab
    sessionToken:"",
    region:"us-east-1"
});

const UserModel = dynamodb.define('user',{
    hashKey:'UserId',
    timestamps: true,
    schema:{
        UserId: dynamodb.types.uuid(),
        name: Joi.string(),
        age:Joi.number()
    },
    tableName: 'UserD'
});

dynamodb.createTables((err: any)=>{
    if(err){
        return console.log('Error creating tables',err)
    }
    console.log('Tables created succesfully')
});