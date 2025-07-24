

//readaptacion para postgresql y typeorm

import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/appoinment";
import { User } from "../entities/user";
import { AppoinmentStatus } from "../interfaces/IAppoinment";
import ICreateAppointmentDto from "../dtos/ICreateAppoinmentDto";


// GET: todos los turnos
export const getAllAppointments = async () => {
  const repo = AppDataSource.getRepository(Appointment);
  return await repo.find({ relations: ["user"] }); // trae también el usuario
};

// GET: turno por id
export const getAppointmentById = async (id: number) => {
  const repo = AppDataSource.getRepository(Appointment);
  const app = await repo.findOne({ where: { id }, relations: ["user"] });
  if (!app) throw new Error("Turno no encontrado");
  return app;
};

// POST: crear turno
  export const createAppointment = async (data: ICreateAppointmentDto) => {
  const { date, time, description, userId } = data;

  const userRepo = AppDataSource.getRepository(User);
  const appRepo = AppDataSource.getRepository(Appointment);

  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) throw new Error("Usuario no encontrado");

  // ✅ Fecha y hora completa del turno
  const appointmentDateTime = new Date(`${date}T${time}`);
  const now = new Date();

  // ✅ Validación 1: 24 horas de anticipación
  const diffInHours = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (diffInHours < 24) {
    throw new Error("El turno debe solicitarse con al menos 24 horas de anticipación.");
  }

  // ✅ Validación 2: No fin de semana
  const dayOfWeek = appointmentDateTime.getDay(); // 0 = domingo, 6 = sábado
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new Error("No se pueden tomar turnos los fines de semana.");
  }

  // ✅ Validación 3: Horario entre 08:00 y 21:00
  const hour = parseInt(time.split(":")[0], 10);
  if (hour < 8 || hour > 21) {
    throw new Error("El horario del turno debe ser entre las 08:00 y las 21:00.");
  }

  const newApp = appRepo.create({
    date,
    time,
    status: AppoinmentStatus.ACTIVE,
    description,
    user
  });

  return await appRepo.save(newApp);
};


// PUT: cancelar turno
export const cancelAppointmentService  = async (id: number) => {
  const repo = AppDataSource.getRepository(Appointment);
  const app = await repo.findOneBy({ id });
  if (!app) throw new Error("Turno no encontrado");
  app.status = AppoinmentStatus.CANCELLED;
  await repo.save(app);
  return app;
};

export const getAppointmentsByUser = async (userId: number) => {
  const appointmentRepository = AppDataSource.getRepository(Appointment);

  return await appointmentRepository.find({
    where: {
      user: { id: userId }, // clave: el campo es "user", no "userId"
    },
    relations: ["user"], // si querés que traiga también los datos del usuario
  });
};
