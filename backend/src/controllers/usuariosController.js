import path from "path";
import { db } from "../database/db.js"; // ✅ conexão correta

// 👉 POST /usuarios - Cadastrar novo usuário
export const cadastrarUsuario = (req, res) => {
  console.log("📦 req.body:", req.body);
  console.log("🖼️ req.file:", req.file);

  const { nome, idade, rua, bairro, estado, biografia } = req.body;
  const foto = req.file?.filename;

  if (!nome || !idade || !rua || !bairro || !estado || !foto) {
    return res.status(400).json({ erro: "Campos obrigatórios faltando." });
  }

  const caminhoFoto = `/uploads/${foto}`;
  const sql = `
    INSERT INTO usuarios (nome, idade, rua, bairro, estado, biografia, imagem)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const valores = [nome, idade, rua, bairro, estado, biografia, caminhoFoto];

  db.query(sql, valores, (erro, resultado) => {
    if (erro) {
      console.error("❌ Erro ao cadastrar usuário:", erro);
      return res.status(500).json({ erro: "Erro ao cadastrar usuário." });
    }

    res.status(201).json({
      mensagem: "✅ Usuário cadastrado com sucesso!",
      id: resultado.insertId,
    });
  });
};

// 👉 GET /usuarios - Listar todos os usuários
export const listarUsuarios = (req, res) => {
  const sql = "SELECT * FROM usuarios";
  db.query(sql, (erro, resultado) => {
    if (erro) {
      console.error("❌ Erro ao buscar usuários:", erro);
      return res.status(500).json({ erro: "Erro ao buscar usuários." });
    }
    res.json(resultado);
  });
};

// 👉 GET /usuarios/:id - Buscar um único usuário por ID
export const buscarUsuarioPorId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM usuarios WHERE id = ?";
  db.query(sql, [id], (erro, resultado) => {
    if (erro) {
      console.error("❌ Erro ao buscar usuário:", erro);
      return res.status(500).json({ erro: "Erro ao buscar usuário." });
    }

    if (resultado.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.json(resultado[0]);
  });
};

// 👉 DELETE /usuarios/:id
export const deletarUsuario = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM usuarios WHERE id = ?";
  db.query(sql, [id], (erro, resultado) => {
    if (erro) {
      console.error("Erro ao excluir usuário:", erro);
      return res.status(500).json({ erro: "Erro ao excluir usuário." });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.json({ mensagem: "Usuário excluído com sucesso!" });
  });
};


// 👉 PUT /usuarios/:id
export const atualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, idade, rua, bairro, estado, biografia } = req.body;
  const foto = req.file?.filename;
  const caminhoFoto = foto ? `/uploads/${foto}` : null;

  let sql = `
    UPDATE usuarios SET
      nome = ?, idade = ?, rua = ?, bairro = ?, estado = ?, biografia = ?
  `;
  const campos = [nome, idade, rua, bairro, estado, biografia];

  if (caminhoFoto) {
    sql += `, imagem = ?`;
    campos.push(caminhoFoto);
  }

  sql += ` WHERE id = ?`;
  campos.push(id);

  db.query(sql, campos, (erro) => {
    if (erro) {
      console.error("❌ Erro ao atualizar usuário:", erro);
      return res.status(500).json({ erro: "Erro ao atualizar usuário." });
    }

    res.json({ mensagem: "✅ Usuário atualizado com sucesso!" });
  });
};
