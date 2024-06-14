import { Request , Response} from "express"
import historiaClinica from "../models/historiaClinica"

export const getHistorias = async (req: Request, res: Response) => {
    const listHistorias = await historiaClinica.findAll();
    
    res.json(listHistorias);
}

export const getHistoria = async (req: Request, res: Response) => {
    const { idHistoria } = req.params;
    const historia = await historiaClinica.findByPk(idHistoria)

    if (historia){
        res.json(historia);
    }else{
        res.status(404).json({
            msg: `No existe un producto con el id ${idHistoria}`
        })
    }
}

export const deleteHistoria = async (req: Request, res: Response) => {
    const { idHistoria } = req.params;
    const historia = await historiaClinica.findByPk(idHistoria)
    
    if(!historia){
        res.status(404).json({
            msg: `No existe un producto con el id ${idHistoria}`
        })
    }
    else {
        await historia.destroy();
        res.json({
            msg: 'La historia fue eliminada con éxito'
        })
    }
}

export const postHistoria = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await historiaClinica.create(body);

        res.json({
            msg: '¡El producto fue agregado con éxito!'
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrió un error, comuníquese con soporte'
        })
    }
    
}

export const putHistoria = async (req: Request, res: Response) => {
    const { body } = req;
    const { idHistoria } = req.params;
    const historia = await historiaClinica.findByPk(idHistoria);

    try{
        if (historia){
            await historia.update(body);
            res.json({
                msg: '¡La historia fue actualizada con éxito!'
            })
        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${idHistoria}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrió un error, comuníquese con soporte'
        })
    }
    
}