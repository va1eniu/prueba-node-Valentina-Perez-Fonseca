import Tiendas from '../models/Tiendas.js';
import TiendasProductos from '../models/Tiendas_Productos.js';
import Promocion from '../models/Promociones.js'; // Asegúrate de usar la misma convención de nombres

const TiendasPController = {
  // Otros métodos CRUD existentes...

  // Nuevo método para obtener productos de una tienda con descuentos de Promocion
  getProductosByTienda: async (req, res) => {
    const { id_tienda } = req.params;

    // Verificación de parámetro obligatorio
    if (!id_tienda) {
      return res.status(400).json({ error: "Se requiere el parámetro 'id_tienda'." });
    }

    try {
      // Obtener productos de la tienda utilizando la relación
      const tienda = await Tiendas.findOne({
        where: { id_tienda },
        include: [
          {
            model: TiendasProductos,  // Asegúrate de usar el modelo correcto
            attributes: ['id_producto', 'valor', 'id_promocion'],  // Especifica las columnas que necesitas
          },
        ],
      });

      // Verificación de datos antes de procesar
      const productosConDescuentos = tienda && tienda.TiendasProductos ? tienda.TiendasProductos.map(producto => {
        const promocionVigente = Promocion.find(promo => promo.id === producto.id_promocion);

        if (promocionVigente) {
          // Calcular descuento y aplicar a los productos
          const descuento = promocionVigente.porcentaje;
          const valorConDescuento = producto.valor - (producto.valor * descuento / 100);

          return {
            ...producto.toJSON(),
            valorConDescuento,
          };
        }

        return producto;
      }) : [];

      res.status(200).json(productosConDescuentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default TiendasPController;
