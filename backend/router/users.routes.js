import { Router } from "express";
import {
  obtenerusers,
  agregaruser,
  borraruser,
  actualizaruser,
  obteneruser,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/get", obtenerusers);
router.post("/post", agregaruser);
router.delete("/:id", borraruser);
router.patch("/:id", actualizaruser);
router.get("/:id", obteneruser);

export default router;
