/* import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connectionDB =await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `Incializado en ${connectionDB.connection.host} en el puerto ${connectionDB.connection.port}`
        console.log(url);
    } catch (error) {
        console.log(error);
    }
}

export default conectarDB; */
// database/config.js
import { Sequelize } from 'sequelize';

const conectarDB = async () => {
    try {
        const sequelize = new Sequelize({
            dialect: 'mysql', 
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            logging: false,
        });

        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('No se pudo conectar a la base de datos.');
    }
};

export default conectarDB;
