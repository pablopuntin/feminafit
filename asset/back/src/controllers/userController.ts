import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { 
  getAllUsersServices, 
  getUserByIdServices, 
  createUserService 
} from "../services/userService";     
import { 
  validateCredentialService, 
  createCredentialService 
} from "../services/credentialServices";   
import IUser from "../interfaces/IUser";
import ICredential from "../interfaces/ICredential";
import { SECRET_KEY } from "../config/envs"; 



// GET /users => Obtener el listado de todos los usuarios.
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersServices();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(404).json({ message: error.message });  
  }
};

// GET /users/:id => Obtener el detalle de un usuario específico.
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = await getUserByIdServices(Number(id));
     // Creamos el objeto IUser manualmente
    const userWithUsername: IUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      nDni: user.nDni,
      birthdate: user.birthdate,
      // 👇 Aca sacamos el username desde la relación
      username: user.credential.username,
    };
       res.status(200).json(userWithUsername);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
    
  


// POST /users/register => registro de un nuevo usuario.
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, birthdate, nDni, username, password } = req.body;

    // Crear credencial
    const credential = await createCredentialService({ username, password });

    // Crear usuario asociado a esa credencial
    const user = await createUserService({ name, email, birthdate, nDni }, credential);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// POST /users/login => login del usuario
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const credential = await validateCredentialService({ username, password });
    const user = await getUserByIdServices(credential.id); // usa el id de Credential para buscar el User

    res.status(200).json({
      login: true,
      user, // en producción deberías retornar campos específicos (no todo el objeto completo)
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};