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
      label: "CLIENTES",
      href: "/clientes",
      content: ['Configuração Jabakule (SMS)']
    },
    {
      label: "PRODUTOS",
      href: "/produtos",
      content: ['Cópia de Segurança', 'Importação de Dados Via Saft']
    },
    {
      label: "ESTOQUE",
      href: "/estoque",
      content: ['Utilizadores', 'Perfil de Utilizadores']
    },
    {
      label: "VENDAS & PDV",
      href: "/venda-pdv",
      content: ['QUIANNI Suporte (QS)', 'Denuncie']
    },
    {
      label: "FINANÇAS",
      href: "/financas",
      content: ['Gestão de Idiomas', 'Ajuda', 'Configurações']
    },
    {
      label: "BACKUP & SEGURANÇA",
      href: "/backup-seguranca",
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
