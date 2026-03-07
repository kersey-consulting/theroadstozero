import type { ReactNode } from 'react';

export type HeroProps = {
    backgroundImage?: string;
    backgroundParallax?: boolean;
    theme?:'primary' | 'secondary' | 'tertiary';
    left?: ReactNode;
    right?: ReactNode;
    leftVert?: 'center' | 'end';
    rightVert?: 'center' | 'end';
};
