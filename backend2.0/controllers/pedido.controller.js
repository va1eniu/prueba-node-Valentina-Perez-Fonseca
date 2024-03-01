// PedidoController.js
import Carrito from '../models/carritos.model.js';
import Pedido from '../models/pedidos.model.js';
import PedidoProducto from '../models/pedidos_productos.model.js';
import TiendasDistancias from '../models/tiendas_distancias.model.js';
import TiendasProductos from '../models/tiendas_productos.model.js';

export const crearPedido = async (req, res) => {
  try {
    // Obtener datos del request
    const {
      instrucciones,
      entrega_fecha,
      id_tienda,
      id_user,
      // ...otros datos del request
    } = req.body;

    // Obtener productos del carrito del usuario
    const carritoProductos = await Carrito.findAll({
      include: [
        {
          model: TiendasProductos,
          as: 'TiendasProducto', // Usa el alias correcto aquí
          attributes: ['id', 'nombre', 'precio'], // Incluye el campo 'precio'
        },
      ],
      where: {
        id_user: id_user, // Asegúrate de tener esta variable definida
      },
    });

    // Calcular valores del pedido
    const valor_productos = carritoProductos.reduce((total, carrito) => {
      return total + (carrito.TiendasProducto.precio || 0);
    }, 0);

    const valor_descuento = carritoProductos.reduce((total, carrito) => {
      // Ajusta según la lógica de descuento, si es necesario
      return total + ((carrito.TiendasProducto.valor || 0) - (carrito.TiendasProducto.valor_promocion || 0));
    }, 0);

    // Obtener valor_envio según la distancia
    const distancia = await TiendasDistancias.findOne({
      where: {
        id_tienda,
      },
    });

    const valor_envio = distancia ? distancia.valor : 0;

    // Calcular valor_final
    const valor_final = valor_productos - valor_descuento + valor_envio;

    // Crear el pedido
    const nuevoPedido = await Pedido.create({
      instrucciones,
      entrega_fecha,
      valor_productos,
      valor_descuento,
      valor_envio,
      valor_final,
      id_tienda,
      id_user,
      // ...otros datos del pedido
    });

    // Crear los pedidos_productos
    for (const carrito of carritoProductos) {
      await PedidoProducto.create({
        cantidad: carrito.cantidad,
        valor_unitario: carrito.TiendasProducto.precio || 0,
        total_teorico: (carrito.TiendasProducto.precio || 0) * carrito.cantidad,
        id_producto: carrito.id_producto,
        id_pedido: nuevoPedido.id,
        // ...otros datos de pedidos_productos
      });
    }

    // Insertar en la tabla Pedidos_Estados
    await PedidoEstado.create({
      estado: 1,
      id_pedido: nuevoPedido.id,
    });

    // Respuesta
    return res.status(201).json({ message: 'Pedido creado exitosamente', pedido: nuevoPedido });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el pedido' });
  }
};
