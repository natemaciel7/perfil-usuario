import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    axios
      .get("http://localhost:3001/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Erro ao carregar usuários:", err));
  };

  const excluirUsuario = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3001/usuarios/${id}`);
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <div className="container mt-5">

      {/* Botão centralizado */}
      <div className="text-center mb-4">
        <button className="btn btn-success" onClick={() => navigate("/cadastrar")}>
          Cadastrar Novo
        </button>
      </div>

      {/* Tabela responsiva */}
      <div className="table-responsive">
        <table className="table table-bordered text-center shadow-sm align-middle" style={{ minWidth: "450px" }}>
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Foto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>
                  {user.imagem ? (
                    <img
                      src={`http://localhost:3001${user.imagem}`}
                      alt="Foto"
                      style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    "Sem foto"
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-center flex-wrap gap-1">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => navigate(`/usuarios/${user.id}`)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/editar/${user.id}`)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => excluirUsuario(user.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
