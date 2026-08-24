// File: src-tauri/src/db/sqlite.rs
use sqlx::{sqlite::SqlitePoolOptions, SqlitePool};

pub async fn connect(database_url: &str) -> Result<SqlitePool, sqlx::Error> {
    SqlitePoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await
}