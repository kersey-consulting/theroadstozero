import styles from './Footer.module.css';
import { SOCIAL_LINKS } from '@/config/social';

const EXTRA_LINKS = [
    { id: 'privacy', label: 'Privacy Policy', href: '/privacy' },
    { id: 'terms', label: 'Terms of Service', href: '/terms' },
    { id: 'contact', label: 'Contact', href: '/contact' },
];

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.columns}>
                    <section className={styles.column} aria-label="Footer links">
                        <h2 className={styles.heading}>Links</h2>
                        <ul className={styles.list}>
                            {EXTRA_LINKS.map(link => (
                                <li key={link.id} className={styles.listItem}>
                                    <a className={styles.link} href={link.href}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.columnCenter} aria-label="About The Road to Zero">
                        <img className={styles.logo} src="/icons/The%20Road%20to%20Zero.png" alt="The Road to Zero Logo" />
                        <p className={styles.description}>
                            The Road to Zero represents a journey back to balance, a return to your body’s natural baseline where health, beauty, and vitality can thrive.In a world of constant stress, overload, inflammation, toxins, and burnout, our bodies drift away from equilibrium.
                        </p>
                    </section>

                    <section className={styles.column} aria-label="Social media links">
                        <h2 className={styles.heading}>Get in Touch</h2>
                        <ul className={styles.socialList}>
                            {SOCIAL_LINKS.map(({ id, label, href, icon }) => (
                                <li key={id} className={styles.socialItem}>
                                    <a
                                        className={styles.socialLink}
                                        href={href}
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <span className={styles.socialIcon} aria-hidden="true">
                                            {icon}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {SOCIAL_LINKS.filter((link) => !!link.text).map(({ id, text }) => (
                            <div key={id} className={styles.socialItem}>
                                <span className={styles.contactText}>{text}</span>
                            </div>
                        ))}
                    </section>
                </div>

                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        The Road to Zero &copy; {new Date().getFullYear()}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
