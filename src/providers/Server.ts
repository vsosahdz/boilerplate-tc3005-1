import express,{Request, Response, NextFunction} from 'express';

class Server{

    //Atributos de la clase
    private app: express.Application;
    private port:number;
    private env:string;

    //Métodos constructores
    constructor(appInit:{port:number;middlewares:any;controllers:any[];env:string}){
        this.app=express();
        this.port=appInit.port;
        this.env=appInit.env;        
    }

    public init():void{
        this.app.listen(this.port,()=>{
            console.log(`Server:Running @'http://localhost:${this.port}'`);
        })
    }
}