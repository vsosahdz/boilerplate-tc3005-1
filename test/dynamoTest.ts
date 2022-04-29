//import dynamodb from 'dynamodb';
//import Joi from 'joi';
const dynamodb = require("dynamodb");
const Joi = require('joi');

//Configuración del SDK en nodejs para poder trabajar con la nube
dynamodb.AWS.config.update({
    accessKeyId:"ASIAWFVAQPIG6C2R2AYC",
    secretAccessKey:"XLTM3ggISLDNRD8+sv5AqBXMHv38+qMYI1MNqZaT",
    //unicamente necesario con el learner lab
    sessionToken:"FwoGZXIvYXdzEDcaDIbiwwFchBzynHN9WCK2AQskD9GETCyB4KumODUvfXGwn7dn6d/boPoHxrN41wNjiaovYd7AViLNetQ4RtFVUWpm777Qdw4Y8klZ4b/WH81wQsDEmjTXtLWQrnMm+5I49TsNjG7kjSMtdKaY7KVIaD+YnZ6YEbUzMhZhyoWWOulJCVrQjidDJID86K938LAQu6GpnFCYh6ABg99fo+mAspKFKW8OI1qWIN3r8LagWWibJBmsc1eZNAbQQ6ND1P/ac3EsQ6KUKIaIrJMGMi28fcZCPF3n+Pgyo9rMld4iZgl6S8bnyiAc2zeYuHg4jC5lApGqOSl+Rz/RCsY=",
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