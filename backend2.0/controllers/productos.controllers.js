import  Producto  from "../models/productos.model.js";// Asegúrate de importar correctamente tus modelos

const ProductoController = {

  getAllProducto: async (req, res) => {
    try {
      const productos = await Producto.findAll();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductoById: async (req, res) => {
    const { id } = req.params;
    try {
      const producto = await Producto.findByPk(id);
      if (producto) {
        res.status(200).json(producto);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProducto: async (req, res) => {
    const { nombre, barcode, presentacion } = req.body;
    try {
      const nuevoProducto = await Producto.create({ nombre, barcode, presentacion });
      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProducto: async (req, res) => {
    const { id } = req.params;
    const { nombre, barcode, presentacion } = req.body;
    try {
      const producto = await Producto.findByPk(id);
      if (producto) {
        await producto.update({ nombre, barcode, presentacion });
        res.status(200).json(producto);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProducto: async (req, res) => {
    const { id } = req.params;
    try {
      const producto = await Producto.findByPk(id);
      if (producto) {
        await producto.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default ProductoController;
