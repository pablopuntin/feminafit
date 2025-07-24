import {Request, Response} from "express";
import { 
     getAllAppointments, 
     getAppointmentById, 
     createAppointment, 
     cancelAppointmentService 
     } from "../services/appoinmentsServices";
import { getUserById } from "./userController";     
import { getUserByIdServices } from "../services/userService";
import { getAppointmentsByUser } from "../services/appoinmentsServices";
import IAppoinment from "../interfaces/IAppoinment";
import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/appoinment";
import { Equal } from "typeorm";

//GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
export const getAllAppoinments =  async(req: Request, res: Response) => {
     try {
     const getAllApp = await getAllAppointments(); 
    res.status(200).json(getAllApp);
}catch (error:any) {
     res.status(404).json({ message: error.message });  
}
}

//GET /appointments/:id => Obtener el detalle de un turno específico.
export const getAppoinmentById = async(req: Request, res: Response) => {
     const { id } = req.params;
     try{     
          const appoinment = await getAppointmentById(Number(id));
          res.status(200).json(appoinment);
} catch (error:any) {
     res.status(404).json({ message: error.message });
}
}

//POST /appointments/schedule => Agendar un nuevo turno.
export const schedule = async (req: Request, res: Response) => {
  try {
    const { date, time, description, userId } = req.body;

    if (!date || !time || !description || !userId) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    // Validar que el usuario exista
    const usuario = await getUserByIdServices(Number(userId));
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });

    }

    // Crear turno
   const newApp = await createAppointment({ date, time, description, userId: Number(userId) });

    res.status(201).json(newApp);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


//PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.
export const cancel = async(req: Request, res: Response) => {
     const { id } = req.params;
     try {
          const isCancelled = await cancelAppointmentService (Number(id));
     res.status(200).json(isCancelled);
}catch (error:any) {
     res.status(404).json({ message: error.message }); 
}
}



export const getAppointmentsByUserId = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    const appointmentRepository = AppDataSource.getRepository(Appointment);

    const appointments = await appointmentRepository.find({
      where: {
        user: { id: Equal(userId) }
      },
      relations: ['user'],
    });

    res.json(appointments);
  } catch (error) {
    console.error("Error al obtener turnos del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};