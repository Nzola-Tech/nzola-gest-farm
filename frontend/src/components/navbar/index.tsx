import { Tabs, Tab } from "@heroui/tabs";
import { useLocation } from "react-router-dom";

import { siteConfig } from "@/config/site";

const tabs = siteConfig.navItems.map((item) => ({
  label: item.label,
  href: item.href,
  content: item.content, // Use empty array if content is not defined
}));

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <div className="w-full">
      <div className="px-2 mt-2">
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
              <div className="dark:bg-zinc-800 bg-gray-100 rounded-md">
                {tab.content.map((item) => (
                  <h1 key={item}>{item}</h1>
                ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
