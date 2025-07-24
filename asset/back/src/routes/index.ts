// routes/index.ts
import { Router } from "express";
import userRouter from "./userRouter";
import appointmentRouter from "./appoinmentRouter";
import credentialRouter from "./credentialRouter";

const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/appointments", appointmentRouter);
indexRouter.use("/credentials", credentialRouter);

export default indexRouter;

