import { userRepository} from  "../config/data-source"
import ICreateUserDto from '../dtos/ICreateUserDto';
import { createCredentialService } from './credentialServices';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user';
import { Credential } from '../entities/credential';




// Obtener todos los usuarios
export const getAllUsersServices = async () => {
  const userRepository = AppDataSource.getRepository(User);
 return  await userRepository.find({relations: ["credential", "appointments"] });
}


// Obtener usuario por ID
export const getUserByIdServices = async (id: number): Promise<User> => {
  const user = await AppDataSource.getRepository(User).findOne({
    where: { id },
    relations: ["credential", "appointments"],
  });

  if (!user) throw new Error("User not found");
  return user;
};

export const createUserService = async (
  userDto: ICreateUserDto,
  credential: Credential
): Promise<User> => {
  const { name, email, birthdate, nDni } = userDto;

  const newUser = userRepository.create({
    name,
    email,
    birthdate,
    nDni,
    credential, // se vincula directamente
  });

  return await userRepository.save(newUser); // guarda usuario y credencial por cascade
};




// Buscar usuario por ID de credencial
export const findUserByCredentialId = async (credentialId: number): Promise<User | null> => {
  const user = await AppDataSource.getRepository(User).findOne({
    where: {
      credential: { id: credentialId }
    },
    relations: ["credential"]
  });
  return user;
};

