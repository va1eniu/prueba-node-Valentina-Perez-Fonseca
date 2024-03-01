import { validationResult } from 'express-validator';
import Carrito from '../models/carritos.model.js';
import Producto from '../models/productos.model.js';
import TiendasProductos from '../models/tiendas_productos.model.js';

const CarritoController = {
  agregarProductoAlCarrito: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id_producto, id_tienda, cantidad } = req.body;

      const carritoExistente = await Carrito.findOne({
        where: {
          id_producto,
          id_tienda,
          id_user: 1,
        },
      });

      if (carritoExistente) {
        carritoExistente.cantidad += cantidad;
        await carritoExistente.save();
        return res.status(200).json(carritoExistente);
      }

      const nuevoProductoEnCarrito = await Carrito.create({
        id_producto,
        id_tienda,
        cantidad,
        id_user: 1,
      });

      res.status(201).json(nuevoProductoEnCarrito);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  listarProductosEnCarrito: async (req, res) => {
    try {
      const { id_tienda, id_user } = req.params;

      const productosEnCarrito = await Carrito.findAll({
        where: {
          id_tienda,
          id_user,
        },
        include: [
          {
            model: Producto,
            attributes: ['nombre', 'valor', 'valor_promocion'],
          },
          {
            model: TiendasProductos,
            attributes: ['compra_maxima'],
            where: {
              id_tienda,
              id_user,
            },
            as: 'TiendasProducto',
          },
        ],
      });

      const productosFormateados = productosEnCarrito.map(producto => {
        const { cantidad, Producto, TiendasProducto } = producto;
        const { nombre, valor, valor_promocion } = Producto.dataValues;
        const { compra_maxima } = TiendasProducto.dataValues;
        const valorTotal = valor_promocion ? valor_promocion * cantidad : valor * cantidad;

        return {
          cantidad,
          valor_unitario: valor,
          valor_promocion,
          valor_total: valorTotal,
          nombre,
          compra_maxima,
        };
      });

      res.status(200).json(productosFormateados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default CarritoController;
