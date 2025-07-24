import { AppDataSource } from '../config/data-source';
import ICreateCredentialDto from '../dtos/ICreateCredentialDto';
import { Credential } from '../entities/credential';
import ICreateAppointmentDto from '../dtos/ICreateAppoinmentDto';

const credentialRepository = AppDataSource.getRepository(Credential);

export const createCredentialService = async (
  createCredentialDto: ICreateCredentialDto
): Promise<Credential> => {
  const { username, password } = createCredentialDto;

  const newCredential = credentialRepository.create({
    username,
    password
  });

  return await credentialRepository.save(newCredential);
};

export const validateCredentialService = async (
  validateCredentialDto: ICreateCredentialDto
): Promise<Credential> => {
  const { username, password } = validateCredentialDto;

  const foundCredential = await credentialRepository.findOneBy({ username });

  if (!foundCredential) throw new Error('Credenciales incorrectas');
  if (foundCredential.password !== password)
    throw new Error('Credenciales incorrectas');

  return foundCredential;
};
