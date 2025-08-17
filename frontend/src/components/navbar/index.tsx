import { Tabs, Tab } from "@heroui/tabs";
import { useLocation } from "react-router-dom";

import { ThemeSwitch } from "../theme-switch";
import { UserIcon } from "../user";

import { siteConfig } from "@/config/site";
import { useAuthStore } from "@/store/auth-store";
import { userRoles } from "@/types/signup";
type NavItem = (typeof siteConfig.navItems)[number];

export default function NavBar() {
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);

  let filteredTabs: NavItem[] = [];

  if (user?.role === "admin") {
    filteredTabs = siteConfig.navItems;
  } else if (user?.role === userRoles[1]) {
    filteredTabs = siteConfig.navItems.filter(
      (item) => item.label === "HOME" || item.label === "VENDAS",
    );
  } else {
    filteredTabs = [];
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-2 mt-2 mb-5">
        <Tabs
          aria-label="Options"
          color="primary"
          defaultSelectedKey={filteredTabs[0]?.href}
          placement="top"
          selectedKey={pathname}
          size="sm"
        >
          {filteredTabs.map((tab) => (
            <Tab key={tab.href} href={tab.href} title={tab.label} />
          ))}
        </Tabs>
        <div className="flex items-center gap-x-4">
          <ThemeSwitch />
          <UserIcon />
        </div>
      </div>
    </div>
  );
}
