import { Router } from "express";
import {
  obtenerproductoss,
  agregarproductos,
  borrarproductos,
  actualizarproductos,
  obtenerproductos,
} from "../controllers/productos.controllers.js";

const router = Router();

router.get("/get", obtenerproductoss);
router.post("/post", agregarproductos);
router.delete("/:id", borrarproductos);
router.patch("/:id", actualizarproductos);
router.get("/:id", obtenerproductos);

export default router;
