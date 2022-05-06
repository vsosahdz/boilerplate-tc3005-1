import dynamodb from '../services/dynamoService';
import joi from 'joi';
import { PREFIX_TABLE } from '../config';


const GrupoModel = dynamodb.define('grupo',{
    hashKey:'GrupoId',
    timestamps:false,
    schema:{
        GrupoId:dynamodb.types.uuid(),
        numEst:joi.number(),
        materia:joi.string()
    },
    tableName:`Grupo${PREFIX_TABLE}`
});


/*dynamodb.createTables((err:any)=>{
    if(err)
        return console.log('Error al crear la tabla',err);
    console.log('Tabla creada exitosamente');
})*/

export default GrupoModel;