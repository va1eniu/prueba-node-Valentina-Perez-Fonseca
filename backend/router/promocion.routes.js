import { Router } from "express";
import {
  obtenerpromocions,
  agregarpromocion,
  borrarpromocion,
  actualizarpromocion,
  obtenerpromocion,
} from "../controllers/promocion.controllers.js";

const router = Router();

router.get("/", obtenerpromocions);
router.post("/", agregarpromocion);
router.delete("/:id", borrarpromocion);
router.patch("/:id", actualizarpromocion);
router.get("/:id", obtenerpromocion);

export default router;
