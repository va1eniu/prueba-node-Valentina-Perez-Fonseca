// tiendas.model.js

import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
/* import Productos from './productos.model.js';  */// Asegúrate de importar el modelo de productos

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class Tiendas extends Model {}

Tiendas.init(
  {
    // ... otras propiedades ...
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de nombre es requerido',
        },
      },
    },
    // ... otras propiedades ...
  },
  {
    sequelize,
    modelName: 'Tiendas',
    timestamps: true,
    tableName: 'tiendas',
  }
);

(async () => {
    try {
      await sequelize.authenticate();
      console.log(`Conexión establecida con éxito a la base de datos.`);
      await sequelize.sync({ force: true });
      console.log(`Base de datos sincronizada.`);
    } catch (error) {
      console.error(`Error al conectar o sincronizar la base de datos: ${error.message}`);
    }
  })();

export default Tiendas;
