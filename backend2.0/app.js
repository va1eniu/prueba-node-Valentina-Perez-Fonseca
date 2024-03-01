import dotenv from 'dotenv';
dotenv.config();
import conectarDB from "./database/config.js";
import Server from "./models/server.js";

//detener el ciclo de todas las relaciones de user
import './models/users.model.js';
import './models/carritos.model.js';
import './models/users_clientes.model.js';
import './models/users_direcciones.model.js';
import './models/pedidos.model.js';

import './models/relations.js';


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

