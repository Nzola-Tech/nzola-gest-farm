// domain/sale.rs
use crate::domain::{DomainError, SaleItem};
use bigdecimal::BigDecimal;

use crate::application::dto::create_sale_dto::PaymentMethod;

impl std::fmt::Debug for PaymentMethod {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            PaymentMethod::Cash => write!(f, "Cash"),
            PaymentMethod::CreditCard => write!(f, "CreditCard"),
            PaymentMethod::DebitCard => write!(f, "DebitCard"),
        }
    }
}

#[derive(Debug)]
pub struct Sale {
    pub id: Option<u64>,
    pub user_id: Option<u64>,
    pub subtotal: BigDecimal,
    pub discount_total: BigDecimal,
    pub total: BigDecimal,
    pub payment_method: PaymentMethod,
}

impl Sale {
    pub fn new(payment_method: String) -> Result<Self, DomainError> {
        if payment_method.trim().is_empty() {
            return Err(DomainError::Invalid("Método de pagamento é obrigatório"));
        }

        Ok(Self {
            id: None,
            user_id: None,
            subtotal: BigDecimal::from(0),
            discount_total: BigDecimal::from(0),
            total: BigDecimal::from(0),
            payment_method: match payment_method.as_str() {
                "Cash" => PaymentMethod::Cash,
                "CreditCard" => PaymentMethod::CreditCard,
                "DebitCard" => PaymentMethod::DebitCard,
                _ => return Err(DomainError::Invalid("Método de pagamento inválido")),
            },
        })
    }

    pub fn add_item(&mut self, item: SaleItem) {
        self.subtotal += item.subtotal;
        self.discount_total += item.discount_amount;
        self.total += item.total;
    }
}
