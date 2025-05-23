export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Nzola Gest Farmácia",
  description: "Gerenciamento de farmácias de maneira eficiente e prática.",
  navItems: [
    {
      label: "HOME",
      href: "/",
      content: ['Dados da Empresa', 'Minha Agenda', 'Alterar Minha Senha']
    },
    {
      label: "COMERCIAL",
      href: "/comercial",
      content: ['Configuração Jabakule (SMS)']
    },
    {
      label: "ARMAZEM",
      href: "/armazem",
      content: ['Cópia de Segurança', 'Importação de Dados Via Saft']
    },
    {
      label: "TESOURARIA",
      href: "/tesouraria",
      content: ['Utilizadores', 'Perfil de Utilizadores']
    },
    {
      label: "CONTABILIDADE",
      href: "/contabilidade",
      content: ['QUIANNI Suporte (QS)', 'Denuncie']
    },
    {
      label: "UTILITÁRIOS E CONFIGURAÇÕES",
      href: "/utilitarios",
      content: ['Gestão de Idiomas', 'Ajuda', 'Configurações']
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
   
  },
};
