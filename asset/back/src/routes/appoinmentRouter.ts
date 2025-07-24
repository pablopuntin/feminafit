import {Router} from "express";
import {cancel, getAllAppoinments,getAppoinmentById, schedule} from "../controllers/appoinmentController";
import { getAppointmentsByUserId } from "../controllers/appoinmentController";

const appoinmentRouter = Router();

appoinmentRouter.get("/user/:userId", getAppointmentsByUserId);
appoinmentRouter.get("/", getAllAppoinments);
appoinmentRouter.get("/:id", getAppoinmentById);
appoinmentRouter.post("/schedule", schedule);
appoinmentRouter.put("/:id/cancel", cancel);

export default appoinmentRouter;
