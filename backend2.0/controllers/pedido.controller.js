import Carrito from '../models/carritos.model.js';
import Pedido from '../models/pedidos.model.js';
import PedidoProducto from '../models/pedidos_productos.model.js';
import TiendasDistancias from '../models/tiendas_distancias.model.js';
import TiendasProductos from '../models/tiendas_productos.model.js';
import PedidoEstado from '../models/pedidos_estados.model.js';
import Tienda from '../models/tiendas.model.js';
import { Op } from 'sequelize';

export const crearPedido = async (req, res) => {
  try {
    const {
      instrucciones,
      entrega_fecha,
      id_tienda,
      id_user,
    } = req.body;

    const carritoProductos = await Carrito.findAll({
      include: [
        {
          model: TiendasProductos,
          as: 'TiendasProducto',
          attributes: ['id', 'nombre', 'precio'],
        },
      ],
      where: {
        id_user: id_user,
      },
    });

    const valor_productos = carritoProductos.reduce((total, carrito) => {
      return total + (carrito.TiendasProducto.precio || 0);
    }, 0);

    const valor_descuento = carritoProductos.reduce((total, carrito) => {
      return total + ((carrito.TiendasProducto.valor || 0) - (carrito.TiendasProducto.valor_promocion || 0));
    }, 0);

    const distancia = await TiendasDistancias.findOne({
      where: {
        id_tienda,
      },
    });

    const valor_envio = distancia ? distancia.valor : 0;

    const valor_final = valor_productos - valor_descuento + valor_envio;

    const nuevoPedido = await Pedido.create({
      instrucciones,
      entrega_fecha,
      valor_productos,
      valor_descuento,
      valor_envio,
      valor_final,
      id_tienda,
      id_user,
    });

    for (const carrito of carritoProductos) {
      await PedidoProducto.create({
        cantidad: carrito.cantidad,
        valor_unitario: carrito.TiendasProducto.precio || 0,
        total_teorico: (carrito.TiendasProducto.precio || 0) * carrito.cantidad,
        id_producto: carrito.id_producto,
        id_pedido: nuevoPedido.id,
      });
    }

    await PedidoEstado.create({
      estado: 1,
      id_pedido: nuevoPedido.id,
    });

    return res.status(201).json({ message: 'Pedido creado exitosamente', pedido: nuevoPedido });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el pedido' });
  }
};

export const listarPedidosCliente = async (req, res) => {
  try {
    const { id_user } = req.body;

    const pedidos = await Pedido.findAll({
      attributes: [
        'id_tienda',
        [Pedido.sequelize.fn('COUNT', 'id'), 'cantidad_pedidos'],
      ],
      where: {
        id_user,
        estado: {
          [Op.in]: [1, 2, 3],
        },
      },
      group: ['id_tienda'],
      include: [
        {
          model: Tienda,
          attributes: ['id', 'nombre'],
        },
      ],
    });

    return res.status(200).json({ pedidos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los pedidos del cliente' });
  }
};
