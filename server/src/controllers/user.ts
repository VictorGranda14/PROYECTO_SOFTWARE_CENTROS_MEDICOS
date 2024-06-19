import { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {

    const {nombrePaciente, apellidoPaciente, idPaciente, email, region, comuna, password, role} = req.body;

    const user = await User.findOne({where: {email: email}})

    if(user){
        return res.status(400).json({
            msg: "Ya existe un usuario con este email"
        })
    }

    try{
        await User.create({
            nombrePaciente: nombrePaciente,
            apellidoPaciente: apellidoPaciente,
            idPaciente: idPaciente,
            region: region,
            comuna: comuna,
            email: email,
            password: password,
            role: role
        })
        res.json({
            msg: 'Usuario creado con exito',
        })
    }catch(error){
        res.status(400).json({
            msg: "Error al crear el usuario",
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Log para verificar los datos recibidos
  console.log(`Datos recibidos: email=${email}, password=${password}`);

  // Validamos que exista el usuario
  const user: any = await User.findOne({ where: { email: email } });
  if (!user) {
    console.log('No existe un usuario con este email');
    return res.status(400).json({
      msg: "No existe un usuario con este email"
    });
  }

  // Validamos la contraseña
  if (password !== user.password) {
    console.log('La contraseña ingresada es incorrecta');
    return res.status(400).json({
      msg: "La contraseña ingresada es incorrecta"
    });
  }

  // Generar el token
  const token = jwt.sign({ email: email, role: user.role}, process.env.SECRET_KEY || 'HOLA123');

  res.json({ token });
};
