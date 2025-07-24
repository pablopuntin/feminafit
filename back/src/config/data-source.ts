import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Credential } from "../entities/credential";
import { Appointment } from "../entities/appoinment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Capachero",
  database: "demo_sql",
  synchronize: true,
  logging: false,
  entities: [User, Credential, Appointment],
});

export const userRepository = AppDataSource.getRepository(User);
export const credentialRepository = AppDataSource.getRepository(Credential);
export const appointmentRepository = AppDataSource.getRepository(Appointment);
