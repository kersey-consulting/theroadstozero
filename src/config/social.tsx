import type { ReactNode } from 'react';

export type SocialLink = {
    id: string;
    label: string;
    href: string;
    icon: ReactNode;
};

export const SOCIAL_LINKS: SocialLink[] = [
    {
        id: 'facebook',
        label: 'Facebook',
        href: 'https://www.facebook.com/theroadtozero0/',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect className={'--svg-stroke-primary --svg-fill-primary'} x="3" y="3" width="18" height="18" rx="4"
                      strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'1'}></rect>
                <line className={'--svg-stroke-secondary'} x1="10" y1="14" x2="16" y2="14"
                      strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}></line>
                <path className={'--svg-stroke-secondary'} d="M17,8H15a2,2,0,0,0-2,2V21"
                      strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}></path>
            </svg>
        ),
    },
    {
        id: 'instagram',
        label: 'Instagram',
        href: 'https://www.instagram.com/theroadtozero0/',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect className={'--svg-stroke-primary --svg-fill-primary'}  x="3" y="3" width="18" height="18" rx="4"
                      strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'1'}></rect>
                <circle className={'--svg-stroke-secondary'} cx="12" cy="12" r="3"
                        strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}></circle>
                <line className={'--svg-stroke-secondary'} x1="16.95" y1="7" x2="17.05" y2="7"
                      strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}></line>
            </svg>
        ),
    },
    {
        id: 'tiktok',
        label: 'TikTok',
        href: 'https://www.tiktok.com/@Theroadtozero0',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <rect className={'--svg-stroke-primary --svg-fill-primary'} x="3" y="3" width="18" height="18" rx="4"
                      strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'1'}></rect>
                <path className={'--svg-stroke-secondary'}
                      d="M10 12C8.34315 12 7 13.3431 7 15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V6C13.3333 7 14.6 9 17 9"
                      strokeWidth={'2'} strokeLinecap={'round'} strokeLinejoin={'round'}></path>
            </svg>
        ),
    },

    {
        id: 'mail',
        label: 'Email',
        href: 'mailTo:Theroadtozero68@gmail.com',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <rect className={'--svg-stroke-primary --svg-fill-primary'} x="3" y="3" width="18" height="18" rx="4"
                      strokeLinecap={'round'} strokeLinejoin={'round'}
                      strokeWidth={'1'}></rect>
                <path className={'--svg-stroke-secondary'} d="M21.2091 5.41992C15.5991 16.0599 8.39906 16.0499 2.78906 5.41992"
                      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform={'scale(0.9) translate(1,3)'}></path>
            </svg>
        ),
    },
];
