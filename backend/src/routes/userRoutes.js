// src/routes/userRoutes.js
import express from "express";
import multer from "multer";
import {
  cadastrarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario, 
  deletarUsuario
} from "../controllers/usuariosController.js";

const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Rotas SEM prefixo
router.get("/:id", buscarUsuarioPorId); // GET /usuarios/:id
router.post("/", upload.single("foto"), cadastrarUsuario); // POST /usuarios
router.get("/", listarUsuarios); // GET /usuarios
router.put("/:id", upload.single("foto"), atualizarUsuario);
router.delete("/:id", deletarUsuario);

export default router;
