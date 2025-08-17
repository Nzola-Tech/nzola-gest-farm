import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { useEffect } from "react";

import Produtos from "./pages/produtos";
import Clientes from "./pages/clientes";
import Estoque from "./pages/estoque";
import VendasPdv from "./pages/pdv";
import Financas from "./pages/financas";
import BeckupSeguranca from "./pages/backup-seguranca";
import { ContextProvider } from "./components/contextProvider";
import Login from "./pages/login";
import { useDbStore } from "./store/db-store";
import { useAuthStore } from "./store/auth-store";
import { ProtectedRoute } from "./components/protectRoute";

import Home from "@/pages/index";
import Signup from "./pages/signup";
import UserManagement from "./pages/users";

function App() {
  const navigate = useNavigate();
  const { initDb } = useDbStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      await initDb();
      await checkAuth();
    };

    init();
  }, [initDb]);

  return (
    <ContextProvider>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        <ToastProvider />
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
            path="/"
          />
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route
            element={
              <ProtectedRoute allowedTypes={["admin"]}>
                <Produtos />
              </ProtectedRoute>
            }
            path="/produtos"
          />
          <Route
            element={
              <ProtectedRoute allowedTypes={["admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
            path="/admin/usermanagement"
          />
          <Route
            element={
              <ProtectedRoute allowedTypes={["admin"]}>
                <Clientes />
              </ProtectedRoute>
            }
            path="/clientes"
          />
          <Route
            element={
              <ProtectedRoute allowedTypes={["admin"]}>
                <Estoque />
              </ProtectedRoute>
            }
            path="/estoque"
          />
          <Route
            element={
              <ProtectedRoute
                allowedTypes={["admin", "user"]}
              >
                <VendasPdv />
              </ProtectedRoute>
            }
            path="/vendas"
          />
          <Route
            element={
              <ProtectedRoute allowedTypes={["admin"]}>
                <Financas />
              </ProtectedRoute>
            }
            path="/financas"
          />
          <Route element={<BeckupSeguranca />} path="/backup-seguranca" />
        </Routes>
      </HeroUIProvider>
    </ContextProvider>
  );
}

export default App;
