import {Request, Response} from 'express';
import AbstractController from './AbstractController';

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
        this.router.get('/readUsers',this.getReadUsers.bind(this))
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

    }
    
}

export default UserController;