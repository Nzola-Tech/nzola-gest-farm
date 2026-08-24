// domain/company_partner.rs
use crate::domain::DomainError;

#[allow(dead_code)]
#[derive(Debug, Clone)]
pub struct CompanyPartner {
    pub name: String,
    pub document_code: String,
    pub quota_percentage: f64,
}

impl CompanyPartner {
    #[allow(dead_code)]
    pub fn validate(&self) -> Result<(), DomainError> {
        if self.quota_percentage <= 0.0 || self.quota_percentage > 100.0 {
            return Err(DomainError::Invalid("Quota inválida"));
        }
        Ok(())
    }
}
