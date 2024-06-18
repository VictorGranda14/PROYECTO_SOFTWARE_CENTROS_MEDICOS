import { Request , Response} from "express";
import Examen from "../models/examen";


export const getExamenes = async (req: Request, res: Response) => {
  const listExamenes = await Examen.findAll();
  res.json(listExamenes);
};

export const getExamen = async (req: Request, res: Response) => {
    const { idExamen } = req.params;
    const examen = await Examen.findByPk(idExamen);

    if (examen){
        res.json(examen);
    }else{
        res.status(404).json({
            msg: `No existe un examen con id ${idExamen}`
        });
    }
};

export const deleteExamen = async (req: Request, res: Response) => {
    const { idExamen } = req.params;
    
    try {
        const examen = await Examen.findByPk(idExamen);

        if(!examen){
            res.status(404).json({
                msg: `No existe examen con id ${idExamen}`
            })
        }
        else {
            await examen.destroy();
            res.json({
                msg: 'Examen eliminado con éxito'
            });
        }
    } catch(error) {
        res.status(500).json({
            msg: 'Error al eliminar el examen',
            error
        });
    }
};

export const postExamen = async (req: Request, res: Response) => { 
    const { fecha, idPaciente, idFuncionario } = req.body;
    const rutaArchivo = req.file?.filename;
    try {
        const examen = await Examen.create({ fecha, rutaArchivo, idPaciente, idFuncionario });
        res.json({
            message: '¡Examen subido con éxito!',
            examen
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al crear el examen',
            error
        });
    }
}


export const putExamen = async (req: Request, res: Response) => {
    const { idExamen } = req.params;
    const { fecha, idPaciente, idFuncionario } = req.body;
    const rutaArchivo = req.file?.filename;
    try{
        const examen = await Examen.findByPk(idExamen);
        if (examen){
            await examen.update({ fecha, rutaArchivo, idPaciente, idFuncionario });
            res.json({
                msg: '¡Examen actualizado con éxito!'
            })
        } else {
            res.status(404).json({
                msg: `No existe examen con id ${idExamen}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrió un error, comuníquese con soporte'
        })
    }
    
}