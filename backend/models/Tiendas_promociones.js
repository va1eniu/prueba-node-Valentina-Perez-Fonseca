/* import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
import Tiendas from './Tiendas.js';
import Promocion from './promociones.js';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class Tiendas_promociones extends Model {}

Tiendas_promociones.init(
  {
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
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de estado es requerido',
        },
      },
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'La fecha de inicio es requerida y debe ser válida',
        },
      },
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'La fecha de fin es requerida y debe ser válida',
        },
      },
    },
    id_tienda: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    id_promocion: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tiendas_promociones',
    timestamps: true,
    tableName: 'tiendas_promociones',
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

Tiendas_promociones.belongsTo(Tiendas, { foreignKey: 'id_tienda' });
Tiendas_promociones.belongsTo(Promocion, { foreignKey: 'id_promocion' });

export default Tiendas_promociones;
 */