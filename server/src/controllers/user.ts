import { Request, Response } from 'express';
import { Paciente } from '../models/paciente';
import { Funcionario } from '../models/funcionario';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
  const {nombre, primerApellido, segundoApellido, fechaNacimiento, numTelefono, idPaciente, email, direccion, password} = req.body;
  const user = await Paciente.findOne({where: {email: email}})
  if(user){
      return res.status(400).json({
          msg: "Ya existe un usuario con este email"
      })
  }
  try{
    await Paciente.create({
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        fechaNacimiento: fechaNacimiento,
        idPaciente: idPaciente,
        direccion: direccion,
        email: email,
        numTelefono: numTelefono,
        password: password
    })
    res.json({
        msg: 'Usuario creado con exito',
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Error al crear el usuario:", error.message);
        res.status(400).json({
            msg: "Error al crear el usuario",
            error: error.message  // Ahora es seguro acceder a error.message
        });
    } else {
        console.error("Error desconocido al crear el usuario", error);
        res.status(500).json({
            msg: "Error desconocido al crear el usuario"
        });
    }
  }     
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Validamos que exista el usuario en pacientes o funcionarios
  const funcionario: any = await Funcionario.findOne({ where: { email: email } });
  const paciente: any = await Paciente.findOne({ where: { email: email } });

  if(funcionario){
    // Validamos la contraseña
    const tipo = 0;
    if (password !== funcionario.password) {
      console.log('La contraseña ingresada es incorrecta');
      return res.status(400).json({
        msg: "La contraseña ingresada es incorrecta"
      });
    }
    // Generar el token
    const token = jwt.sign({ email: email, 
      rut: funcionario.idFuncionarioSalud,
      nombre: funcionario.nombre,
      apellido: funcionario.primerApellido
    }, process.env.SECRET_KEY || 'HOLA123');
    res.json({ token, tipo });

  } else if (paciente){
    // Validamos la contraseña
    const tipo = 1;
    if (password !== paciente.password) {
      console.log('La contraseña ingresada es incorrecta');
      return res.status(400).json({
        msg: "La contraseña ingresada es incorrecta"
      });
    }
    // Generar el token
    const token = jwt.sign({ 
      email: email, 
      rut: paciente.idPaciente, 
      nombre: paciente.nombre,
      apellido: paciente.primerApellido
    }, process.env.SECRET_KEY || 'HOLA123');
    res.json({ token, tipo });
    
  } else {
    console.log('No existe un usuario con este email');
    return res.status(400).json({
      msg: "No existe un usuario con este email"
    });
  }
};

export const getFuncionarios = async (req: Request, res: Response) => {
  const listFuncionarios = await Funcionario.findAll();
  res.json(listFuncionarios);
};
