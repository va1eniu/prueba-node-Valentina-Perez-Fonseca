import { Router } from "express";
import {
  obtenertiendass,
  agregartiendas,
  borrartiendas,
  actualizartiendas,
  obtenertiendas,
} from "../controllers/tiendas.controllers.js";

const router = Router();

router.get("/", obtenertiendass);
router.post("/", agregartiendas);
router.delete("/:id", borrartiendas);
router.patch("/:id", actualizartiendas);
router.get("/:id", obtenertiendas);

export default router;

