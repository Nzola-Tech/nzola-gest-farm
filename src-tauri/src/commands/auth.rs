use tauri::State;
use crate::application::auth_service::AuthService;
use crate::domain::user::{AuthResponse, LoginInput, SignUpInput};
use crate::infrastructure::mysql_user_repository::MySqlUserRepository;

#[tauri::command]
pub async fn signup(
    auth_service: State<'_, AuthService<MySqlUserRepository>>,
    input: SignUpInput,
) -> Result<AuthResponse, String> {
    auth_service.signup(input).await
}
    
#[tauri::command]
pub async fn login(
    auth_service: State<'_, AuthService<MySqlUserRepository>>,
    input: LoginInput,
) -> Result<AuthResponse, String> {
    auth_service.login(input).await
}