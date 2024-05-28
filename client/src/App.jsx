import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Header from "./components/Header";
import Divinopolis from "./pages/Divinopolis";
import Imperatriz from "./pages/Imperatriz";
import PedroLeopoldo from "./pages/PedroLeopoldo";
import Rumo from "./pages/Rumo";
import Klabin from "./pages/Klabin";
import CadastroColab from "./components/CadastroColab";
import VisualizarColab from "./components/VisualizarColab";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Divinópolis" element={<Divinopolis />} />
        <Route path="/visualizar/:id" element={<VisualizarColab />} />
        <Route path="/cadastro" element={<CadastroColab />} />
        <Route path="/imperatriz" element={<Imperatriz />} />
        <Route path="/pedro-leopoldo" element={<PedroLeopoldo />} />
        <Route path="/rumo" element={<Rumo />} />
        <Route path="/klabin" element={<Klabin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
