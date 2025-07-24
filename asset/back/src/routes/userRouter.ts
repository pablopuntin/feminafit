import { Router } from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/userController";



const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", register);

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);



console.log("✅ userRouter cargado");


export default userRouter;