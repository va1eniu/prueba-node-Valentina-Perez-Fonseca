// relations.js
import Pedido from './pedidos.model.js';
import PedidoEstado from './pedidos_estados.model.js';
import Carrito from './carritos.model.js';
import PedidoProducto from './pedidos_productos.model.js';
import Tienda from './tiendas.model.js';

const defineRelations = () => {
  // Relación entre Pedido y Tienda
  Pedido.belongsTo(Tienda, { foreignKey: 'id_tienda' });

  // Relación entre Pedido y PedidoEstado
  Pedido.hasMany(PedidoEstado, { foreignKey: 'id_pedido' });

  // Relación entre Pedido y Carrito
  Pedido.hasMany(Carrito, { foreignKey: 'id_pedido' });

  // Relación entre Pedido y PedidoProducto
  Pedido.hasMany(PedidoProducto, { foreignKey: 'id_pedido' });

  // Relación entre PedidoEstado y Pedido
  PedidoEstado.belongsTo(Pedido, { foreignKey: 'id_pedido' });
};

const relations = {
  defineRelations,
};

export default relations;
