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
        { id: 'aesthetic-treatments', href: '/services/aesthetic-treatments', labels: { en: 'Aesthetic Treatments', es: '' } },
        { id: 'body-transformation', href: '/services/body-transformation', labels: { en: 'Body Transformation', es: '' } },
        { id: 'iv-therapy', href: '/services/iv-therapy', labels: { en: 'IV Therapy & Vitamin Injections', es: '' } },
        { id: 'medical-weight-management', href: '/services/medical-weight-management', labels: { en: 'Medical Weight Management', es: '' } },
        { id: 'peptide-hormone-support', href: '/services/peptide-hormone-support', labels: { en: 'Peptide & Hormone Support', es: '' } },
        { id: 'holistic-services', href: '/services/holistic-services', labels: { en: 'Holistic Services', es: '' } },
        ]
    },
];
