// domain/company.rs
use crate::domain::{FiscalProfile, CompanyPartner};

#[allow(dead_code)]
#[derive(Debug)]
pub struct Company {
    pub id: Option<u64>,
    pub name: String,
    pub email: String,
    pub nif: String,
    pub phone: String,
    pub company_type: String,
    pub fiscal_profile: FiscalProfile,
    pub partners: Vec<CompanyPartner>,
}
