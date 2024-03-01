// index.js

// Importa todos los modelos
import UserCliente from './users_clientes.model.js';
import UserDireccion from './users_direcciones.model.js';
import Carrito from './carritos.model.js';
import Pedido from './pedidos.model.js';
import PedidoEstado from './pedidos_estados.model.js';
import PedidoProducto from './pedidos_productos.model.js';
import Producto from './productos.model.js';
import Promocion from './promociones.model.js';
import Tienda from './tiendas.model.js';
import TiendaDistancia from './tiendas_distancias.model.js';
import TiendaPromocion from './tiendas_promociones.model.js';
import TiendaProducto from './tiendas_productos.model.js';
import User from './users.model.js';

// Relaciones entre los modelos
UserCliente.belongsTo(UserDireccion, { foreignKey: 'id_direccion', as: 'direccionPrincipal' });
UserDireccion.belongsTo(UserCliente, { foreignKey: 'id_user', as: 'cliente' });

Carrito.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });
Carrito.belongsTo(Tienda, { foreignKey: 'id_tienda', as: 'tienda' });
Carrito.belongsTo(User, { foreignKey: 'id_user', as: 'cliente' });

Pedido.belongsTo(User, { foreignKey: 'id_user', as: 'cliente' });
Pedido.belongsTo(Tienda, { foreignKey: 'id_tienda', as: 'tienda' });

PedidoEstado.belongsTo(Pedido, { foreignKey: 'id_pedido', as: 'pedido' });

PedidoProducto.belongsTo(Pedido, { foreignKey: 'id_pedido', as: 'pedido' });
PedidoProducto.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });
PedidoProducto.belongsTo(Promocion, { foreignKey: 'id_promocion', as: 'promocion' });

Producto.hasMany(Carrito, { foreignKey: 'id_producto', as: 'carritos' });
Producto.hasMany(PedidoProducto, { foreignKey: 'id_producto', as: 'pedidosProductos' });
Producto.hasMany(TiendaProducto, { foreignKey: 'id_producto', as: 'tiendasProductos' });

Promocion.hasMany(TiendaPromocion, { foreignKey: 'id_promocion', as: 'tiendasPromociones' });
Promocion.hasMany(PedidoProducto, { foreignKey: 'id_promocion', as: 'pedidosProductos' });

Tienda.hasMany(TiendaDistancia, { foreignKey: 'id_tienda', as: 'distancias' });
Tienda.hasMany(TiendaProducto, { foreignKey: 'id_tienda', as: 'productos' });
Tienda.hasMany(TiendaPromocion, { foreignKey: 'id_tienda', as: 'promociones' });
Tienda.hasMany(Carrito, { foreignKey: 'id_tienda', as: 'carritos' });
Tienda.hasMany(Pedido, { foreignKey: 'id_tienda', as: 'pedidos' });

TiendaDistancia.belongsTo(Tienda, { foreignKey: 'id_tienda', as: 'tienda' });

TiendaProducto.belongsTo(Tienda, { foreignKey: 'id_tienda', as: 'tienda' });
TiendaProducto.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });
TiendaProducto.belongsTo(Promocion, { foreignKey: 'id_promocion', as: 'promocion' });

TiendaPromocion.belongsTo(Tienda, { foreignKey: 'id_tienda', as: 'tienda' });
TiendaPromocion.belongsTo(Promocion, { foreignKey: 'id_promocion', as: 'promocion' });

// Exporta todos los modelos
export {
  UserCliente,
  UserDireccion,
  Carrito,
  Pedido,
  PedidoEstado,
  PedidoProducto,
  Producto,
  Promocion,
  Tienda,
  TiendaDistancia,
  TiendaPromocion,
  TiendaProducto,
  User,
};
