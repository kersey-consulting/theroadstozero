import styles from './Footer.module.css';
import { SOCIAL_LINKS } from '@/config/social';

const EXTRA_LINKS = [
    { id: 'privacy', label: 'Privacy Policy', href: '/privacy' },
    { id: 'contact', label: 'Contact', href: '/contact' },
];

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.columns}>
                    <section className={styles.column} aria-label="Footer links">
                        <h3 className={styles.heading}>Links</h3>
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
                        <img className={styles.logo} src="/icons/gold-ring-logo.png" alt="The Road to Zero Logo" />
                    </section>

                    <section className={styles.column} aria-label="Social media links">
                        <h3 className={styles.heading}>Get in Touch</h3>
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
                <div>
                    <p className={styles.description}>
                        Disclaimer: These services are not intended to diagnose, treat, cure, or prevent any disease. The material on this brochure is provided for informational purposes only and is not medical advice or treatment. Always consult your physician before beginning any therapy program.
                    </p>
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
