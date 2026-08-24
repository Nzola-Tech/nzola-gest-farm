// File src-tauri/src/lib.rs

mod app_state;
mod application;
mod commands;
mod config; // Novo módulo adicionado
mod db;
mod domain;
mod infrastructure;

use app_state::AppState;
use config::AppConfig;
use db::mysql;
use tauri::Manager;

// Auth services
use crate::application::auth_service::AuthService;
use crate::infrastructure::mysql_user_repository::MySqlUserRepository;

// Product services
use crate::application::product_service::ProductService;
use crate::infrastructure::mysql_product_repository::MySqlProductRepository;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let config = AppConfig::load();

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(move |app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            let handle = app.handle().clone();
            let db_url = config.database_url.clone();

            tauri::async_runtime::block_on(async move {
                // Tenta conectar sem crashar com panic
                let pool = match mysql::connect(&db_url).await {
                    Ok(pool) => pool,
                    Err(err) => {
                        log::error!("Falha ao conectar no MySQL ({}): {:?}", db_url, err);
                        return Err(Box::new(err) as Box<dyn std::error::Error>);
                    }
                };

                let user_repository = MySqlUserRepository::new(pool.clone());
                let auth_service = AuthService::new(std::sync::Arc::new(user_repository));
                let product_repository = MySqlProductRepository::new(pool.clone());
                let product_service = ProductService::new(product_repository);

                handle.manage(auth_service);
                handle.manage(product_service);
                handle.manage(AppState { db: pool });

                Ok(())
            })?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::health::health_check,
            commands::product::create_product,
            commands::product::list_products,
            commands::product::get_product,
            commands::product::delete_product,
            commands::product::update_product,
            commands::auth::login,
            commands::auth::signup,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}