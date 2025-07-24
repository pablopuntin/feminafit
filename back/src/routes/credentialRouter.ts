import { Router } from "express";
const router = Router();

// Ruta de prueba
router.get("/", (req, res) => {
  res.send("Rutas de credenciales");
});

export default router;
