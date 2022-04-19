import {Router} from 'express';

export default abstract class AbstractController{
    //Atributos
    private _router: Router = Router();
    private _prefix: string;

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