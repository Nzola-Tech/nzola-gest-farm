import { Tabs, Tab } from '@heroui/tabs';
import { ThemeSwitch } from '../theme-switch';
import { siteConfig } from '@/config/site';
import { useLocation } from 'react-router-dom';

const tabs = siteConfig.navItems.map((item) => ({
    label: item.label,
    href: item.href,
    content: item.content // Use empty array if content is not defined
}));

export default function NavBar() {
    const { pathname } = useLocation()
    return (
        <div className="w-full">
            <div className="px-2 mt-2">
                <Tabs
                    aria-label='Options'
                    color='primary'
                    placement='top'
                    size='sm'
                    defaultSelectedKey={tabs[0].label}
                    selectedKey={pathname}
                >
                    {tabs.map((tab,index) => (
                        <Tab key={`${siteConfig.navItems[index].href}`} title={tab.label} href={`${tabs[index].href}`}>
                            <div className="dark:bg-zinc-800 bg-gray-100 rounded-md">
                                {tab.content.map((item) => (
                                    <h1 key={item} >
                                        {item}
                                    </h1>
                                ))}
                            </div>
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