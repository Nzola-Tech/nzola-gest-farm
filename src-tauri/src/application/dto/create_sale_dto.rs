// File src-tauri/application/dto/create_sale_dto.rs
use crate::application::dto::sale_item_dto::SaleItemDTO;
pub enum PaymentMethod {
    Cash,
    CreditCard,
    DebitCard,
}
pub struct CreateSaleDTO {
    pub customer_id: i32,
    pub items: Vec<SaleItemDTO>,
    pub payment_method: PaymentMethod,
}