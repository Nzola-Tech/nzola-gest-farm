import { Tabs, Tab } from "@heroui/tabs";
import { useLocation } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "../theme-switch";

const tabs = siteConfig.navItems.map((item) => ({
  label: item.label,
  href: item.href,
  content: item.content, // Use empty array if content is not defined
}));

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <div className="w-full">
      <div className="px-2 mt-2 mb-5">
        <Tabs
          aria-label="Options"
          color="primary"
          defaultSelectedKey={tabs[0].label}
          placement="top"
          selectedKey={pathname}
          size="sm"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={`${siteConfig.navItems[index].href}`}
              href={`${tabs[index].href}`}
              title={tab.label}
            >  
            </Tab>
          ))}
        </Tabs>
        <div className="absolute top-4 right-10">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}
