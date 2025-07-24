// index.ts
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import server from "./server";
import { PORT } from "./config/envs";

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conexión a la base de datos realizada con éxito");
    server.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar con la base de datos:", error);
  });
