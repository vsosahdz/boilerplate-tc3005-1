import axios from 'axios';
let url ='https://zpdzfn1jqg.execute-api.us-west-2.amazonaws.com/default/UberService';
let datos = {
    "client_id": 1234, 
    "client": "Erick Hernandez", 
    "email": "donas@gmail.com", 
    "cellphone": 55768909, 
    "client_location": "Mundo E", 
    "destination": "Plaza Satelite"
};


axios.post(url,datos)
    .then(response=>{
        console.log(response.data);
    })