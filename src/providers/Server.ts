import express,{Request, Response, NextFunction} from 'express';
import AbstractController from '../controllers/AbstractController';
import db from '../models'

class Server{

    //Atributos de la clase
    private app: express.Application;
    private port:number;
    private env:string;

    //Métodos constructores
    constructor(appInit:{port:number;middlewares:any[];controllers:AbstractController[];env:string}){
        this.app=express();
        this.port=appInit.port;
        this.env=appInit.env;  
        this.loadMiddlewares(appInit.middlewares);      
        this.routes(appInit.controllers);
    }

    //Cargar los middlewares
    private loadMiddlewares(middlewares:any):void{
        middlewares.forEach((middleware:any)=>{
            this.app.use(middleware)
        })
    }

    private routes(controllers:AbstractController[]):void{
        //Ruta auxiliar para verificar el funcionamiento de la app
        this.app.get('/',(_:any,res:Response)=>
                    res.status(200).send({
                        message:"The backend module is working",
                        documentation: 'http://github.com'
                    })
        )
        //Agregar controladores
        controllers.forEach((controller:AbstractController)=>{
            this.app.use(`/${controller.prefix}`,controller.router);
        })

    }

    //Agregar la conexión a la base de datos
    private async databases(){
        await db.sequelize.sync();
    }

    public async init(){
        await this.databases();
        this.app.listen(this.port,()=>{
            console.log(`Server:Running @'http://localhost:${this.port}'`);
        })
    }
}

export default Server;