import { Request , Response} from "express"
import cita from "../models/cita";

export const getCitas= async (req: Request, res: Response) => {
    const listCitas = await cita.findAll();
    
    res.json(listCitas);
}

export const getCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    const citaBuscada = await cita.findByPk(idCita)

    if (citaBuscada){
        res.json(citaBuscada);
    }else{
        res.status(404).json({
            msg: `No existe cita con id ${idCita}`
        })
    }
}

export const deleteCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    const citaBuscada = await cita.findByPk(idCita)
    
    if(!citaBuscada){
        res.status(404).json({
            msg: `No existe cita con id ${idCita}`
        })
    }
    else {
        await citaBuscada.destroy();
        res.json({
            msg: 'La cita fue eliminada con éxito'
        })
    }
}

export const postCita= async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await cita.create(body);

        res.json({
            msg: '¡La cita fue agregada con éxito!'
        })
    } catch (error:any) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
          res.status(400).json({
            msg: 'El RUT ingresado no existe. Por favor, ingrese un RUT válido.',
            error
          });
        } else {
          res.status(500).json({
            msg: 'Error al crear la cita',
            error
          });
        }
    }
    
};

export const putCita = async (req: Request, res: Response) => {
    const { body } = req;
    const { idCita } = req.params;
    const citaBuscada = await cita.findByPk(idCita);

    try{
        if (citaBuscada){
            await citaBuscada.update(body);
            res.json({
                msg: '¡La cita fue actualizada con éxito!'
            })
        } else {
            res.status(404).json({
                msg: `No existe cita con id ${idCita}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrió un error, comuníquese con soporte'
        })
    }
    
}