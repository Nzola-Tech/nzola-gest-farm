// domain/user.rs
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq)] 
pub enum UserRole {
    ADMIN,
    RESET,
    USER,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct User {
    pub id: u64,
    pub username: String,
    pub name: String,
    pub surname: String,
    pub role: UserRole,
    pub is_active: bool,
    pub email: Option<String>
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct SignUpInput {
    pub username: String,
    pub password: String,
    pub name: String,
    pub surname: String,
    pub role: UserRole,
    pub is_active: bool,
    pub email: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct LoginInput {
    pub username: String,
    pub password: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct AuthResponse {
    pub user: User,
    pub token: Option<String>, // Preenchido no modo Online (JWT)
}

impl User {
    pub fn new(id: u64, username: String, name: String, surname: String, role: UserRole, is_active: bool, email: Option<String>) -> Self {
        User {
            id,
            username,
            name,
            surname,
            role,
            is_active,
            email,
        }
    }
}
