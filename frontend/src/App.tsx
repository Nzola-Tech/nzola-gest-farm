import { Route, Routes, useHref, useNavigate } from "react-router-dom";

import Home from "@/pages/index";
import Comercial from "./pages/comercial";
import Armazem from "./pages/armazem";
import Tesouraria from "./pages/tesouraria";
import Contabilidade from "./pages/contabilidade";
import Utilitarios from "./pages/utilitarios";
import { HeroUIProvider } from "@heroui/system";


function App() {
  const navegate = useNavigate()
  return (
    <HeroUIProvider navigate={navegate} useHref={useHref} >
      <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Comercial />} path="/comercial" />
      <Route element={<Armazem />} path="/armazem" />
      <Route element={<Tesouraria />} path="/tesouraria" />
      <Route element={<Contabilidade />} path="/contabilidade" />
      <Route element={<Utilitarios />} path="/utilitarios" />
    </Routes>
    </HeroUIProvider> 
  );
}

export default App;
