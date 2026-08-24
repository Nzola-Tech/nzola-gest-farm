// File src-tauri/src/application/auth_sevice.rs
use std::sync::Arc;
use crate::domain::repositories::user_repository::UserRepository;
use crate::domain::user::{SignUpInput, LoginInput, AuthResponse};

pub struct AuthService<R: UserRepository> {
    repository: Arc<R>,
}

impl<R: UserRepository> AuthService<R> {
    pub fn new(repository: Arc<R>) -> Self {
        Self { repository }
    }

    pub async fn signup(&self, input: SignUpInput) -> Result<AuthResponse, String> {
        self.repository.signup(input).await
    }

    pub async fn login(&self, input: LoginInput) -> Result<AuthResponse, String> {
        self.repository.login(input).await
    }
}