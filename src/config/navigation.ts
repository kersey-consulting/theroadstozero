export type NavItem = {
    id: string;
    href: string;
    labels: Record<string, string>;
};

export const NAV_ITEMS: NavItem[] = [
    { id: 'home', href: '/', labels: { en: 'Home', es: 'Home' } },
    { id: 'about', href: '/about', labels: { en: 'About', es: '' } },
    { id: 'whyus', href: '/why-us', labels: { en: 'Why Us', es: '' } },
    { id: 'services', href: '/services', labels: { en: 'Services', es: '' } },
];
