import { Route, Routes, useHref, useNavigate } from "react-router-dom";

import Home from "@/pages/index";
import Produtos from "./pages/produtos";
import Clientes from "./pages/clientes";
import Estoque from "./pages/estoque";
import VendasPdv from "./pages/vendas-pdv";
import Financas from "./pages/financas";
import BeckupSeguranca from "./pages/backup-seguranca";
import { HeroUIProvider } from "@heroui/system";
import { ContextProvider } from "./components/contextProvider";
import {ToastProvider} from "@heroui/toast";

function App() {
  const navegate = useNavigate()
  return (
    <ContextProvider>
      <HeroUIProvider navigate={navegate} useHref={useHref} >
        <ToastProvider/>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Produtos />} path="/produtos" />
          <Route element={<Clientes />} path="/clientes" />
          <Route element={<Estoque />} path="/estoque" />
          <Route element={<VendasPdv />} path="/vendas" />
          <Route element={<Financas />} path="/financas" />
          <Route element={<BeckupSeguranca />} path="/backup-seguranca" />
        </Routes>
      </HeroUIProvider>
    </ContextProvider>
  );
}

export default App;
