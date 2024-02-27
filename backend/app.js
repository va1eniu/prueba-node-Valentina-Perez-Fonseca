import dotenv from 'dotenv';
dotenv.config();
import conectarDB from "./database/config.js";
import Server from "./models/server.js";

const iniciarApp = async () => {
    try {

        await conectarDB();
        
      
        const server = new Server();

     
        server.listen();

        console.log('La aplicación se ha iniciado correctamente.');

    } catch (error) {
        console.error('Error al iniciar la aplicación:', error.message);
    }
};

iniciarApp();

