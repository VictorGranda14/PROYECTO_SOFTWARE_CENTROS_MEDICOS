import { Request , Response} from "express"
import  Cita  from "../models/cita";

export const getCitas= async (req: Request, res: Response) => {
    const listCitas = await Cita.findAll();
    res.json(listCitas);
}

export const getCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    const citaBuscada = await Cita.findByPk(idCita)

    if (citaBuscada){
        res.json(citaBuscada);
    }else{
        res.status(404).json({
            msg: `No existe cita con id ${idCita}`
        })
    }
}

export const cancelarCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    try {
      const cita = await Cita.findByPk(idCita);
      if (cita) {
        await Cita.destroy({ where: { idCita } });
        res.json({ msg: 'Cita cancelada con éxito' });
      } else {
        res.status(404).json({ msg: `No existe cita con id ${idCita}` });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Error al cancelar la cita', error });
    }
  };
  
export const postCita= async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Cita.create(body);
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

export const obtenerCitasPorFuncionario = async (req: Request, res: Response) => {
  const { idFuncionarioSalud } = req.params;
  try {
    const citas = await Cita.findAll({ where: { idFuncionarioSalud: idFuncionarioSalud } });
    if (citas.length > 0) {
      res.json(citas);
    } else {
      res.status(404).json({ msg: `No existen citas para el funcionario con rut ${idFuncionarioSalud}` });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las citas', error });
  }
};

export const obtenerCitasPorPaciente = async (req: Request, res: Response) => {
  const { idPaciente } = req.params;
  try {
      const citas = await Cita.findAll({ where: { idPaciente: idPaciente } });
      if (citas.length > 0) {
          res.json(citas);
      } else {
          res.status(404).json({
              msg: `No existe cita con id de paciente ${idPaciente}`
          });
      }
  } catch (error) {
      res.status(500).json({
          msg: 'Error al buscar citas',
          error
      });
  }
};

