import Server from "./providers/Server";
import { PORT,NODE_ENV } from "./config";
import express from 'express';
import cors from 'cors';
import UserController from "./controllers/UserController";
import AuthenticationController from './controllers/AuthenticationController';



const app = new Server({
    port:PORT,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true}),
        cors()
    ],
    controllers:[
        UserController.getInstance(),
        AuthenticationController.getInstance()
    ],
    env:NODE_ENV
});

declare global{
    namespace Express{
        interface Request{
            user:string;
            token:string;
        }
    }
}


app.init();
