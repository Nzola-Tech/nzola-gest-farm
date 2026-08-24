export type UserRole = "ADMIN" | "USER" | "MANAGER";

export type UserStatus = "active" | "inactive" | "blocked";

export interface User {
  id?: number;
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
  password: string;
  role?: UserRole;
  status?: UserStatus;
  created_at?: Date;
  updated_at?: Date;
}

export const userRoles: UserRole[] = ["ADMIN", "USER", "MANAGER"];
