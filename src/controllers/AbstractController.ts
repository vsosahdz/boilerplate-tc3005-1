import {Router} from 'express';
//Middlewares
import ValidationErrorMiddleware from '../middlewares/validationError';
//Services
import CognitoService from '../services/cognitoService';

export default abstract class AbstractController{
    //Atributos
    private _router: Router = Router();
    private _prefix: string;

    protected handleErrors = ValidationErrorMiddleware.handleErrors;
    protected cognitoService = CognitoService.getInstance();

    public get prefix(): string {
        return this._prefix;
    }
    public get router(): Router {
        return this._router;
    }
    constructor(prefix:string){
        this._prefix=prefix;
        this.initRoutes();
    }
    protected abstract initRoutes():void;
    
}