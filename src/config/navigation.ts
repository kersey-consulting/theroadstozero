export type NavItem = {
    id: string;
    href: string;
    labels: Record<string, string>;
    children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
    { id: 'home', href: '/', labels: { en: 'Home', es: 'Home' } },
    { id: 'about', href: '/about', labels: { en: 'About Us', es: '' } },
    { id: 'whyus', href: '/why-us', labels: { en: 'Why Us', es: '' } },
    { id: 'location', href: '/locations', labels: { en: 'Locations', es: '' } },
    { id: 'services', href: '/services', labels: { en: 'Services', es: '' }, children: [
        { id: 'service1', href: '/services/service1', labels: { en: 'Aesthetics Treatments', es: '' } },
        { id: 'service2', href: '/services/service2', labels: { en: 'Medical Weight Management', es: '' } },
        { id: 'service3', href: '/services/service3', labels: { en: 'IV Therapy', es: '' } },
        { id: 'service4', href: '/services/service3', labels: { en: 'Peptide & Hormone Support', es: '' } },
        ]
    },
];
