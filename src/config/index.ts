export const PORT:number = process.env.PORT ? +process.env.PORT:8080;
export const NODE_ENV:string =process.env.NODE_ENV ? process.env.NODE_ENV as string: 'development';
export const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : 'prueba';
export const DB_DIALECT = process.env.DB_DIALECT ? process.env.DB_DIALECT : 'mysql'; 
export const DB_USER = process.env.DB_USER ? process.env.DB_USER : 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'root';
export const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : 'localhost'