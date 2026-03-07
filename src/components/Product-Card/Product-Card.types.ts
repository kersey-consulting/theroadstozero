import type { ReactNode } from 'react';

export type ProductCardProps = {
    imagePath: string;
    title: string;
    subtext: ReactNode;
    button: {
        label: string;
        href: string;
    };
};
