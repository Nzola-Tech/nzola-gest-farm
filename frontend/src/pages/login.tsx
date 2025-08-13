import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { useAuthStore } from "@/store/auth-store";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await login({ username, password });

      if (success) {
        addToast({
          title: "Login realizado!",
          variant: "solid",
        });
        navigate("/");
      } else {
        addToast({
          title: "Usuário ou senha inválidos",
          variant: "solid",
        });
      }
    } catch (err) {
      addToast({
        title: "Erro ao fazer login",
        variant: "solid",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col gap-y-4 w-full max-w-sm shadow-lg p-4">
        <ArrowLeftIcon
          className="size-6"
          onClick={() => {
            navigate("..");
          }}
        />
        <p className="text-xl font-semibold text-center">Entrar</p>

        <form className="flex flex-col gap-y-4" onSubmit={handleLogin}>
          <Input
            required
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            required
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" color="primary" type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
