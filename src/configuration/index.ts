export const PORT:number = process.env.PORT ? +process.env.PORT:8080;
export const NODE_ENV:string =process.env.NODE_ENV ? process.env.NODE_ENV as string: 'development';
