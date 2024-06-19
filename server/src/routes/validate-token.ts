import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']

    if(headerToken != undefined){
        try{
            const Btoken = headerToken.slice(7);
            jwt.verify(Btoken, process.env.SECRET_KEY || 'HOLA123');
            next()
        }catch(error){
            res.status(401).json({
                msg: 'token invalido'
            })
        }
    } else {
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }
}

export default validateToken