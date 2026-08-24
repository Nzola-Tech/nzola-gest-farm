use crate::domain::user::{ SignUpInput, LoginInput, AuthResponse};

#[async_trait::async_trait]
pub trait UserRepository: Send + Sync {
    async fn signup(&self, input: SignUpInput) -> Result<AuthResponse, String>;
    async fn login(&self, input: LoginInput) -> Result<AuthResponse, String>;
}