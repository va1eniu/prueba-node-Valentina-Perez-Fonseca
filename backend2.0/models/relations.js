// relations.js
import User from './users.model.js';
import Carrito from './carritos.model.js';
import UserCliente from './users_clientes.model.js';
import UserDireccion from './users_direcciones.model.js';
import Pedido from './pedidos.model.js';

User.hasOne(UserCliente, { foreignKey: 'id_user' });
User.hasMany(UserDireccion, { foreignKey: 'id_user' });
User.hasMany(Carrito, { foreignKey: 'id_user' });
User.hasMany(Pedido, { foreignKey: 'id_user' });
