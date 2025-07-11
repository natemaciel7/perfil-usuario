import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    rua: "",
    bairro: "",
    estado: "",
    biografia: "",
    foto: null,
  });

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState(""); // "success" ou "danger"
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post("http://localhost:3001/usuarios", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMensagem("Usuário cadastrado com sucesso!");
      setTipoMensagem("success");

      setTimeout(() => {
        navigate(`/usuarios/${response.data.id}`);
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMensagem("Erro ao cadastrar usuário.");
      setTipoMensagem("danger");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Cadastrar Usuário</h2>

      {mensagem && (
        <div className={`alert alert-${tipoMensagem} text-center`} role="alert">
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Idade</label>
          <input
            type="number"
            name="idade"
            className="form-control"
            value={form.idade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Rua</label>
          <input
            type="text"
            name="rua"
            className="form-control"
            value={form.rua}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Bairro</label>
          <input
            type="text"
            name="bairro"
            className="form-control"
            value={form.bairro}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Estado</label>
          <input
            type="text"
            name="estado"
            className="form-control"
            value={form.estado}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Biografia</label>
          <textarea
            name="biografia"
            className="form-control"
            rows="3"
            value={form.biografia}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12">
          <label className="form-label">Foto de perfil</label>
          <input
            type="file"
            name="foto"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <div className="col-12 text-center mt-3">
          <button type="submit" className="btn btn-success me-2">
            Salvar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
