export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Nzola Gest Farmácia",
  description: "Gerenciamento de farmácias de maneira eficiente e prática.",
  navItems: [
    {
      label: "HOME",
      href: "/",
      role: ["admin", "farmaceutico", "funcionario"],
    },
    {
      label: "VENDAS",
      href: "/vendas",
      role: ["admin", "farmaceutico", "funcionario"],
    },
    {
      label: "PRODUTOS",
      href: "/produtos",
      content: ["Criar Produto"],
      role: ["admin"],
    },
    {
      label: "ESTOQUE",
      href: "/estoque",
      role: ["admin"],
    },
    {
      label: "FINANÇAS",
      href: "/financas",
      role: ["admin"],
    },
    {
      label: "CLIENTES",
      href: "/clientes",
      role: ["admin"],
    },
    {
      label: "BACKUP & SEGURANÇA",
      href: "/backup-seguranca",
      role: ["admin"],
    },
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
  links: {},
};
