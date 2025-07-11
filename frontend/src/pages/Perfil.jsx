import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Perfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3001/usuarios/${id}`);
        setUsuario(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar usuário:", erro);
      }
    };

    buscarUsuario();
  }, [id]);

  const excluirUsuario = async () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (confirmacao) {
      try {
        await axios.delete(`http://localhost:3001/usuarios/${id}`);
        alert("Usuário excluído com sucesso.");
        navigate("/");
      } catch (erro) {
        console.error("Erro ao excluir usuário:", erro);
        alert("Erro ao excluir usuário.");
      }
    }
  };

  if (!usuario) return <p className="text-center mt-5">Carregando...</p>;

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
    

      <div className="card shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body text-center">
          {usuario.imagem && (
            <img
              src={`http://localhost:3001${usuario.imagem}`}
              alt="Foto de perfil"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          )}
          <h4 className="card-title">{usuario.nome}</h4>
          <p><strong>Idade:</strong> {usuario.idade}</p>
          <p><strong>Rua:</strong> {usuario.rua}</p>
          <p><strong>Bairro:</strong> {usuario.bairro}</p>
          <p><strong>Estado:</strong> {usuario.estado}</p>
          <p><strong>Biografia:</strong> {usuario.biografia}</p>
        </div>
      </div>

      <div className="mt-4 d-flex gap-3">
        <button className="btn btn-warning" onClick={() => navigate(`/editar/${id}`)}>
          <i className="bi bi-pencil"></i>
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          <i className="bi bi-list-ul"></i>
        </button>
        <button className="btn btn-success" onClick={() => navigate("/cadastrar")}>
          <i className="bi bi-person-plus"></i>
        </button>
        <button className="btn btn-danger" onClick={excluirUsuario}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}
