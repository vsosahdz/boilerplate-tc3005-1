import { Request, Response } from 'express';
import AbstractController from "./AbstractController";
import GrupoModel from '../modelsNOSQL/grupoNOSQL';
import db from '../models';



class UserController extends AbstractController{
    protected validateBody(type: any) {
        throw new Error('Method not implemented.');
    }
    
    //Singleton

    private static instance: UserController;
    public static getInstance():AbstractController{
        if(this.instance){
            return this.instance;
        }
        this.instance = new UserController("user");
        return this.instance;
    }
    
    
    //Routes
    protected initRoutes(): void {
        this.router.post('/createUser',this.postCreateUser.bind(this)); // Create
        this.router.get('/readUsers',this.getReadUsers.bind(this));
        this.router.get('/readUser',this.getReadUser.bind(this));
        this.router.post('/createGrupo',this.postCreateGrupo.bind(this)); 
        this.router.get('/readGrupos',this.getReadGrupos.bind(this));    
        this.router.get('/readGruposToken',this.authMiddleware.verifyToken,this.getReadGruposToken.bind(this));
        this.router.get('/readGruposTokenPermission',this.authMiddleware.verifyToken,this.permissionMiddleware.checkIsAdmin,this.getReadGruposToken.bind(this));
        
        //this.router.post('/deleteUser');        
    }

    private async getReadGruposToken(req: Request, res: Response){
        
        try{
            const grupos = await GrupoModel.scan().exec().promise();            
            res.status(200).send(grupos[0].Items);
        }catch(err){
            res.status(500).send("Error fatal:"+err);
        }
    }

    private async getReadGrupos(req: Request, res: Response){
        try{
            const grupos = await GrupoModel.scan().exec().promise();
            res.status(200).send(grupos[0].Items);
        }catch(err){
            res.status(500).send("Error fatal:"+err);
        }
    }

    private async postCreateGrupo(req:Request,res:Response){
        try{
            console.log(req.body);
            await GrupoModel.create(req.body);
            console.log("Registro existos");
            res.status(200).send("Registro existoso");
        }catch(err:any){
            console.log(err);
            res.status(500).send("Error fatal");
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
            res.status(500).send("Error fatal:" +err);
        }
    }

    private async getReadUser(req:Request,res:Response){
       try{
            res.status(200).send({ data:"User"});
       }catch(error){
           if (error instanceof Error){
            res.status(500).send({ message: error.message });
           }else{
            res.status(500).send({ message: "Error" });
           }
       }     
    }

    private async getReadUsers(req:Request,res:Response){
        try{
            let usuarios= await db["User"].findAll()
            console.log("Usuario:", usuarios);
            res.send(usuarios);
        
        }catch(error){
            if (error instanceof Error){
                res.status(500).send({ message: error.message });
            }else{
                res.status(500).send({ message: "Error" });
            }
        }
    }
    
    private async postUpdateUser(req:Request,res:Response){

    }
    private async postDeleteUser(req:Request,res:Response){

    }
    
}

export default UserController;