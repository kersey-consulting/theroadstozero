import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { NAV_ITEMS } from '@/config/navigation';
import { SOCIAL_LINKS } from '@/config/social';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const DESKTOP_BREAKPOINT = 768;

        const onResize = () => {
            if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return (
        <header className={styles.header}>
            <a href="#main" className={styles.skipLink}>
                Skip to main content
            </a>

            <div className={styles.headerNavigation}>
                <a className={styles.logoAnchor} href={'/'}>
                    <img className={styles.logo} src="/icons/logo.png" alt="The Roads to Zero Logo" />
                </a>
                <div className={styles.headerContainer}>
                    <div className={styles.navlinkcontainer}>
                        <nav className={styles.navigationPages}>
                            <ul className={styles.pageLinks}>
                                {NAV_ITEMS.map(item => (
                                    <li key={item.id}>
                                        <a href={item.href}>{item.labels.en}</a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <nav>
                            <ul className={styles.socialLinks}>
                                {SOCIAL_LINKS.map(({ id, label, href, icon }) => (
                                    <li key={id}>
                                        <a
                                            href={href}
                                            aria-label={label}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.socialLink}>
                                            {icon}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <a className={styles.cta} href={"https://booking.hydreight.com/widget-business/fk58k"}>Book Appointment</a>
                </div>
                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.openHamburger + ' disable-scroll' : ''}`}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(open => !open)}>
                    <span/>
                    <span/>
                    <span/>
                </button>
            </div>
        </header>
    );
}
