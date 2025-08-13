import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth-store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: ("admin" | "farmaceutico" | "farmaceutica")[];
}

export const ProtectedRoute = ({
  children,
  allowedTypes,
}: ProtectedRouteProps) => {
  const { user } = useAuthStore();

  if (!user) return <Navigate replace to="/login" />;

  if (allowedTypes && !allowedTypes.includes(user.role!)) {
    return <Navigate replace to="/unauthorized" />;
  }

  return <>{children}</>;
};
