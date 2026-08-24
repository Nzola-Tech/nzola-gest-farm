import { User } from "@/types/signup";

export interface AuthResponse {
    user: User;
    token?: string | null;
}