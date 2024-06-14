import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesHistorias from '../routes/historias';
import db from '../db/connection';

class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`)
        })
    }

    routes(){
        this.app.get('/', (req: Request, res: Response) =>{
            res.json({
                msg: 'API FUNCIONANDO'
            })
        });
        this.app.use('/api/historias', routesHistorias) 
    }

    middlewares(){
        //parseo
        this.app.use(express.json());

        //cors
        this.app.use(cors());
    }

    async dbConnect(){

        try{
            await db.authenticate();
            console.log('Base de datos conectada');
        }catch(error){
            console.log(error);
            console.log('Error al conectarse a la base de datos');
        }
    }
}

export default Server