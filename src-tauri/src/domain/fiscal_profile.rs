// domain/fiscal_profile.rs

#[allow(dead_code)]
#[derive(Debug, Clone)]
pub struct FiscalProfile {
    pub fiscal_regime: String,
    pub requires_saft: bool,
    pub requires_vat: bool,
}
