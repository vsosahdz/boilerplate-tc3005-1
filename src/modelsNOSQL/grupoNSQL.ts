import dynamodb from '../services/dynamoService';
import Joi from 'joi';
import { PREFIX_TABLE } from '../config/index';




const GroupModel = dynamodb.define('group',{
    hashKey:'GroupId',
    timestamps: true,
    schema:{
        GroupId: dynamodb.types.uuid(),
        numStudent: Joi.number(),
        subject:Joi.string()
    },
    tableName: `Group${PREFIX_TABLE}`
});

dynamodb.createTables((err: any)=>{
    if(err){
        return console.log('Error creating tables',err)
    }
    console.log('Tables created succesfully')
});

export default GroupModel;