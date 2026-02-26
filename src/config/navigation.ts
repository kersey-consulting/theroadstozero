export type NavItem = {
    id: string;
    href: string;
    labels: Record<string, string>;
    children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
    { id: 'home', href: '/', labels: { en: 'Home', es: 'Home' } },
    { id: 'about', href: '/about', labels: { en: 'About', es: '' } },
    { id: 'whyus', href: '/why-us', labels: { en: 'Why Us', es: '' } },
    { id: 'services', href: '/services', labels: { en: 'Services', es: '' }, children: [
        { id: 'service1', href: '/services/service1', labels: { en: 'Service 1', es: '' } },
        { id: 'service2', href: '/services/service2', labels: { en: 'Service 2', es: '' } },
        { id: 'service3', href: '/services/service3', labels: { en: 'Service 3', es: '' } },
        ]
    },
];
