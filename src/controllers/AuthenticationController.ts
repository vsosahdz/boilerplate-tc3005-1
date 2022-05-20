import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import AbstractController from "./AbstractController";
import UserModel from '../modelsNOSQL/userNOSQL';
import db from '../models';



class AuthenticationController extends AbstractController{
    
    
    //Singleton

    private static instance: AuthenticationController;
    public static getInstance():AbstractController{
        if(this.instance){
            return this.instance;
        }
        this.instance = new AuthenticationController("auth");
        return this.instance;
    }
    
    protected initRoutes(): void {
        this.router.post('/signup', this.validateBody('signup'), this.handleErrors, this.signup.bind(this));
        this.router.post('/signin', this.validateBody('signin'), this.handleErrors, this.signin.bind(this));
		this.router.post('/verify', this.validateBody('verify'), this.handleErrors, this.verify.bind(this));
        this.router.get('/readUsers',this.handleErrors,this.getReadUsers.bind(this));
        this.router.get('/readUsersRe',this.handleErrors,this.getReadUsersRe.bind(this));
    }

    private async signup(req: Request, res: Response) {
		const { email, password, name, role} = req.body;

		try {
			// Create Cognito User
			const user = await this.cognitoService.signUpUser(email, password, [
				{
					Name: 'email',
					Value: email,
				},
				{
					Name: 'name',
					Value: name,
				}				
			]);
			console.log('cognito user created', user);

			//Save user in DB noSQL
			await UserModel.create(
				{
					awsCognitoId: user.UserSub,
					name,
					role,
                    email
				},
				{ overwrite: false }
			);
           
			console.log('Usuario salvado en BD no relacional')

            //Save user in DB relacional
            await db["User"].create({
                awsCognitoId: user.UserSub,
                name,
                role,
                email
            });
			
            console.log('Usuario salvado en BD relacional')
			res.status(201).send({message:"User signedup"});
		} catch (error:any) {
			//console.log('failed auth controller', error);
			res.status(500).send({ code: error.code, message: error.message });
		}
	}

    private async verify(req: Request, res: Response) {
		const { email, code } = req.body;
		try {
			await this.cognitoService.verifyUser(email, code);
			//await this.emailService.emailNotificationSingUp( email, email);
			return res.status(200).end();
		} catch (error:any) {
			//console.log('failed auth controller', error);
			res.status(500).send({ code: error.code, message: error.message }).end();
		}
	}

    private async signin(req: Request, res: Response) {
		const { email, password } = req.body;

		try {
			const login = await this.cognitoService.signInUser(email, password);

			// const userDB = await UserModel.query(email).usingIndex('EmailIndex').exec().promise()
			// const userDBResult = userDB[0].Items[0].attrs;

			res.status(200).send({ ...login.AuthenticationResult });
			//.end();
		} catch (error:any) {
			res.status(500).send({ code: error.code, message: error.message });
		}
	}

    private async getReadUsers(req: Request, res: Response){
        try{
            const users = await UserModel.scan().exec().promise();
            res.status(200).send(users[0].Items);
        }catch(err){
            res.status(500).send("Error fatal:"+err);
        }
    }

    private async getReadUsersRe(req:Request,res:Response){
        try{
            let usuarios= await db["User"].findAll();            
            res.status(200).send(usuarios);        
        }catch(error:any){
            res.status(500).send({ code: error.code, message: error.message });            
        }
    }

    protected validateBody(type: |'signup'|'signin'|'verify') {
        switch(type){
            case 'signup':
                return checkSchema({
                    email:{
                        in:'body',
                        isEmail:{
                            errorMessage:'Must be a valid email'
                        }
                    },
                    password:{
                        isString:{
                            errorMessage:'Must be a string'
                        },
                        isLength:{
                            options:{
                                min:8
                            },
                            errorMessage:'Must be at least 8 characters'
                        }
                    },
                    name: {
						isString: {
							errorMessage: 'Must be a string',
						},
						isLength: {
							options: {
								min: 2,
								max: 40,
							},
							errorMessage: 'Must be between 4 and 20 characters',
						},
					},
                });
            case 'signin':
                return checkSchema({
					email: {
						in: 'body',
						isEmail: {
							errorMessage: 'Must be a valid email',
						},
					},
					password: {
						isString: {
							errorMessage: 'Must be a string',
						},
						isLength: {
							options: {
								min: 8,
							},
							errorMessage: 'Must be at least 8 characters',
						},
					},
				});
            case 'verify':
                return checkSchema({
                    email: {
                        in: 'body',
                        isEmail: {
                            errorMessage: 'Must be a valid email',
                        },
                    },
                    code: {
                        isString: {
                            errorMessage: 'Must be a string',
                        },
                        isLength: {
                            options: {
                                min: 6,
                                max: 8,
                            },
                            errorMessage: 'Must be between 6 and 8 characters',
                        },
                    },
                });    
        }
    }
}

export default AuthenticationController;