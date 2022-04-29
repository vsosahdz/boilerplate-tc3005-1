import {Request, Response} from 'express';
import AbstractController from './AbstractController';
import db from '../models';
import GroupModel from '../modelsNOSQL/grupoNSQL';
import {UUIDV4 } from 'sequelize';


class UserController extends AbstractController{
    //singleton
    private static instance:UserController;

    public static getInstance():AbstractController{
        if(this.instance){ //La instancia ya fue creada
            return this.instance;
        }
        //En caso de que no haya creada la instancia la creamos
        this.instance = new UserController("user");
        return this.instance;
    }
    
    //Configuracion de rutas
    protected initRoutes(): void {
        this.router.get('/readUser',this.getReadUser.bind(this));
        this.router.get('/readUsers',this.getReadUsers.bind(this));
        this.router.post('/createUsers',this.postCreateUser.bind(this));
        this.router.post('/createGroup',this.postCreateGroup.bind(this));
        

    }

    //Controlador
    private async getReadUser(req:Request,res:Response){
        try{
            res.status(200).send({data:"User"});
        }catch(error){
            if(error instanceof Error){
                res.status(500).send({message: error.message});
            }else{
                res.status(501).send({message:"Error"})
            }
        }
    }

    private async getReadUsers(req:Request,res:Response){
        try{
            //SELECT * FROM User;
            let resultado:any = await db["User"].findAll();
            res.status(200).send(resultado);
        }catch(error){
            if(error instanceof Error){
                res.status(500).send({message: error.message});
            }else{
                res.status(501).send({message:"Error"})
            }
        }
    }

    private async postCreateUser(req:Request,res:Response){
        try{
            console.log(req.body);
            await db["User"].create(req.body);
            console.log("Registro exitoso");
            res.status(200).send("Registro exitoso");
        }catch(err:any){
            console.log("Error")
            res.status(500).send("Error fatal");
        }
                
    }

    private async postCreateGroup(req:Request,res:Response){
        try{
            console.log(req.body);
            
            await GroupModel.create(req.body);
            console.log("Registro exitoso");
            res.status(200).send("Registro exitoso");
        }catch(err:any){
            console.log(err)
            res.status(500).send("Error fatal");
        }
    }
    
}

export default UserController;