import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Listagem from "./pages/Listagem";
import Detalhe from "./pages/Detalhe";
import Formulario from "./pages/Formulario";
import wallp from "./assets/wallp2.jpg";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundImage: `url(${wallp})`,
          minHeight: "100vh",
          backgroundSize: "cover",
        }}
      >
        <nav>
          <Link to="/">Listagem</Link> | <Link to="/novo">Novo</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Listagem />} />
          <Route path="/novo" element={<Formulario />} />
          <Route path="/editar/:id" element={<Formulario />} />
          <Route path="/detalhe/:id" element={<Detalhe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
