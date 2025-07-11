import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState(""); // "success" ou "danger"

  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    rua: "",
    bairro: "",
    estado: "",
    biografia: "",
    foto: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/usuarios/${id}`).then((res) => {
      setFormData(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nome", formData.nome);
    data.append("idade", formData.idade);
    data.append("rua", formData.rua);
    data.append("bairro", formData.bairro);
    data.append("estado", formData.estado);
    data.append("biografia", formData.biografia);
    if (formData.foto) data.append("foto", formData.foto);

    try {
      await axios.put(`http://localhost:3001/usuarios/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMensagem("Usuário atualizado com sucesso!");
      setTipoMensagem("success");

      setTimeout(() => navigate(`/usuarios/${id}`), 2000);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setMensagem("Erro ao atualizar usuário.");
      setTipoMensagem("danger");
    }
  };

  return (
   <div className="container mt-5">
  <h2 className="mb-4 text-center">Editar Usuário</h2>

  <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
    
    <div className="col-md-6">
      <label className="form-label">Nome</label>
      <input
        type="text"
        name="nome"
        className="form-control"
        value={formData.nome}
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
        value={formData.idade}
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
        value={formData.rua}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">Bairro</label>
      <input
        type="text"
        name="bairro"
        className="form-control"
        value={formData.bairro}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">Estado</label>
      <input
        type="text"
        name="estado"
        className="form-control"
        value={formData.estado}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-12">
      <label className="form-label">Biografia</label>
      <textarea
        name="biografia"
        className="form-control"
        rows="3"
        value={formData.biografia}
        onChange={handleChange}
      />
    </div>

    <div className="col-12">
      <label className="form-label">Foto</label>
      <input
        type="file"
        name="foto"
        className="form-control"
        accept="image/*"
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
