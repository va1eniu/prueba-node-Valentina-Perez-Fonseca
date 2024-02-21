import { Router } from "express";
import {
  obtenerInventario,
  agregarInventario,
  borrarInventario,
  actualizarInventario,
  obtenerItemInventario,
} from "../controllers/inventario.controller.js";

const router = Router();

router.get("/", obtenerInventario);
router.post("/", agregarInventario);
router.delete("/:id", borrarInventario);
router.patch("/:id", actualizarInventario);
router.get("/:id", obtenerItemInventario);

export default router;
