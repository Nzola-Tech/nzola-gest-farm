use std::env;

pub struct AppConfig {
    pub database_url: String,
}

impl AppConfig {
    pub fn load() -> Self {
        // Carrega o .env se existir
        dotenvy::from_filename("../.env")
            .ok()
            .or_else(|| dotenvy::dotenv().ok());

        let database_url = match env::var("DATABASE_URL") {
            Ok(url) => url,
            Err(_) => {
                // Configuração Padrão de Desenvolvimento
                if cfg!(target_os = "android") {
                    // 10.0.2.2 aponta para o localhost do PC a partir do Emulador Android
                    "mysql://root:root@10.0.2.2:3307/nzola_gest".to_string()
                } else {
                    "mysql://root:root@localhost:3307/nzola_gest".to_string()
                }
            }
        };

        Self { database_url }
    }
}