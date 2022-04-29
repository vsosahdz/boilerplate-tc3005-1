export const PORT:number = process.env.PORT ? +process.env.PORT:8080;
export const NODE_ENV:string =process.env.NODE_ENV ? process.env.NODE_ENV as string: 'development';
export const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : 'prueba';
export const DB_DIALECT = process.env.DB_DIALECT ? process.env.DB_DIALECT : 'mysql'; 
export const DB_USER = process.env.DB_USER ? process.env.DB_USER : 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'root';
export const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : 'localhost'
export const AWS_REGION = process.env.AWS_REGION ? process.env.AWS_REGION : 'us-east-1'
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY ? process.env.AWS_ACCESS_KEY : "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY : "";
export const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN ? process.env.AWS_SESSION_TOKEN : "";
export const PREFIX_TABLE = NODE_ENV === 'production' ? '' : '-DEV';
