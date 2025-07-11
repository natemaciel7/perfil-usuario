import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Perfil from "./pages/Perfil";
import Cadastro from "./pages/Cadastro";
import Editar from "./pages/Editar";
import ListarTodos from "./pages/ListarTodos";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="text-center mb-4">
  <h1 className="fw-bold display-5">Sistema de Perfis de Usuários</h1>
  <p className="text-muted">Gerencie, visualize e edite perfis com facilidade.</p>
</header>

        <nav className="mb-4">
    
        </nav>
      <Routes>
  <Route path="/" element={<ListarTodos />} />
 <Route path="/usuarios/:id" element={<Perfil />} />
  <Route path="/cadastrar" element={<Cadastro />} />
  <Route path="/editar/:id" element={<Editar />} />
</Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
