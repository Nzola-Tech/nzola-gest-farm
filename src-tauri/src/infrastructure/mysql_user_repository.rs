use crate::domain::repositories::user_repository::UserRepository;
use crate::domain::user::{SignUpInput, LoginInput, AuthResponse, User, UserRole};
use sqlx::{MySqlPool, Row};
use bcrypt::{hash, verify, DEFAULT_COST};

pub struct MySqlUserRepository {
    pool: MySqlPool,
}

impl MySqlUserRepository {
    pub fn new(pool: MySqlPool) -> Self {
        Self { pool }
    }
}

#[async_trait::async_trait]
impl UserRepository for MySqlUserRepository {
    async fn signup(&self, input: SignUpInput) -> Result<AuthResponse, String> {
        let hashed_password = hash(&input.password, DEFAULT_COST).map_err(|e| e.to_string())?;

        // Inicia a transação
        let mut tx = self.pool.begin().await.map_err(|e| e.to_string())?;
        
        let result = sqlx::query(
            r#"
            INSERT INTO users (username, password_hash, name, surname, role, email)
            VALUES (?, ?, ?, ?, ?, ?)
            "#,
        )
        .bind(&input.username)
        .bind(&hashed_password)
        .bind(&input.name)
        .bind(&input.surname)
        .bind(format!("{:?}", &input.role))
        .bind(&input.email)
        .execute(&mut *tx)
        .await
        .map_err(|e| e.to_string())?;

        let user_id = result.last_insert_id();

        tx.commit().await.map_err(|e| e.to_string())?;

        let user = User {
            id: user_id,
            username: input.username,
            name: input.name,
            surname: input.surname,
            role: input.role,
            is_active: true,
            email: input.email,
        };

        Ok(AuthResponse { user, token: None })
    }

    async fn login(&self, input: LoginInput) -> Result<AuthResponse, String> {
        let row = sqlx::query(
            r#"
            SELECT id, username, password_hash, name, surname, role, email
            FROM users
            WHERE username = ?
            "#
        )
        .bind(&input.username)
        .fetch_optional(&self.pool)
        .await
        .map_err(|e| e.to_string())?;

        if let Some(user_row) = row {
            // Extrai as colunas do MySqlRow usando .get(...)
            let password_hash: String = user_row.get("password_hash");
            let role_str: String = user_row.get("role");

            if verify(&input.password, &password_hash).map_err(|e| e.to_string())? {
                let role = match role_str.as_str() {
                    "ADMIN" => UserRole::ADMIN,
                    "RESET" => UserRole::RESET,
                    "USER" => UserRole::USER,
                    _ => return Err("Invalid user role".to_string()),
                };

                let user = User {
                    id: user_row.get("id"),
                    username: user_row.get("username"),
                    name: user_row.get("name"),
                    surname: user_row.get("surname"),
                    role,
                    is_active: true,
                    email: user_row.get("email"),
                };

                Ok(AuthResponse { user, token: None })
            } else {
                Err("Invalid username or password 1".to_string())
            }
        } else {
            Err("Invalid username or password 2".to_string())
        }
    }
}