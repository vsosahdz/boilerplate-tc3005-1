"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'https://zpdzfn1jqg.execute-api.us-west-2.amazonaws.com/default/UberService';
var datos = {
    "client_id": 1234,
    "client": "Erick Hernandez",
    "email": "donas@gmail.com",
    "cellphone": 55768909,
    "client_location": "Mundo E",
    "destination": "Plaza Satelite"
};
axios_1["default"].post(url, datos)
    .then(function (response) {
    console.log(response.data);
});
