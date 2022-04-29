import dynamodb from 'dynamodb';
import { AWS_REGION,AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN } from '../config';


//Configuración del SDK en nodejs para poder trabajar con la nube
dynamodb.AWS.config.update({
    accessKeyId:AWS_ACCESS_KEY,
    secretAccessKey:AWS_SECRET_ACCESS_KEY,
    //unicamente necesario con el learner lab
    sessionToken: AWS_SESSION_TOKEN,
    region:AWS_REGION
});

export default dynamodb;