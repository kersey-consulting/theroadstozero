import { useEffect, useId, useState } from 'react';
import styles from './Header.module.css';
import { NAV_ITEMS } from '@/config/navigation';
import { SOCIAL_LINKS } from '@/config/social';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
    const submenuIdPrefix = useId();

    const getSubmenuDomId = (itemId: string) => `${submenuIdPrefix}-submenu-${itemId}`;

    useEffect(() => {
        const DESKTOP_BREAKPOINT = 768;

        const onResize = () => {
            if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                setMenuOpen(false);
                setOpenSubmenuId(null);
            }
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    useEffect(() => {
        if (!openSubmenuId) return;

        const submenuDomId = getSubmenuDomId(openSubmenuId);

        const getEls = () => {
            const submenuEl = document.getElementById(submenuDomId);
            const buttonEl = document.querySelector<HTMLButtonElement>(`button[aria-controls="${submenuDomId}"]`);
            return { submenuEl, buttonEl };
        };

        const onPointerDown = (event: PointerEvent) => {
            const targetNode = event.target as Node | null;
            if (!targetNode) return;

            const { submenuEl, buttonEl } = getEls();

            const clickedInSubmenu = !!submenuEl?.contains(targetNode);
            const clickedInButton = !!buttonEl?.contains(targetNode);

            if (!clickedInSubmenu && !clickedInButton) {
                setOpenSubmenuId(null);
            }
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;

            const { buttonEl } = getEls();
            setOpenSubmenuId(null);

            // Restore focus to the toggle button (helps keyboard users)
            queueMicrotask(() => buttonEl?.focus());
        };

        // capture=true ensures we see the click even if something stops propagation
        document.addEventListener('pointerdown', onPointerDown, true);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown, true);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [openSubmenuId, submenuIdPrefix]);
    return (
        <header className={styles.header}>
            <a href="#main" className={styles.skipLink}>
                Skip to main content
            </a>
            <nav>
                <ul className={styles.socialLinks}>
                    {SOCIAL_LINKS.map(({ id, label, href, text, icon }) => (
                        <li key={id}>
                            <a
                                href={href}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}>
                                {icon}
                                {text != null && <span>{text}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.headerNavigation}>
                <a className={styles.logoAnchor} href={'/'}>

                </a>
                <div className={styles.headerContainer}>
                    <div className={styles.navlinkcontainer}>
                        <nav className={styles.navigationPages}>
                            <ul className={styles.pageLinks}>
                                {NAV_ITEMS.map(item => {
                                    const hasChildren = (item.children?.length ?? 0) > 0;
                                    const submenuId = `${submenuIdPrefix}-submenu-${item.id}`;
                                    const submenuOpen = openSubmenuId === item.id;

                                    return (
                                        <li key={item.id} className={styles.navItem}>
                                            {hasChildren ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className={styles.navButton}
                                                        aria-haspopup="menu"
                                                        aria-expanded={submenuOpen}
                                                        aria-controls={submenuId}
                                                        onClick={() =>
                                                            setOpenSubmenuId(current => (current === item.id ? null : item.id))
                                                        }>
                                                        {item.labels.en}
                                                    </button>

                                                    <ul
                                                        id={submenuId}
                                                        className={`${styles.submenu} ${submenuOpen ? styles.submenuOpen : ''}`}
                                                        aria-label={`${item.labels.en} submenu`}>
                                                        {item.children!.map(child => (
                                                            <li key={child.id} className={styles.submenuItem}>
                                                                <a
                                                                    className={styles.submenuLink}
                                                                    href={child.href}
                                                                    onClick={() => {
                                                                        setOpenSubmenuId(null);
                                                                        setMenuOpen(false);
                                                                    }}>
                                                                    {child.labels.en}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            ) : (
                                                <a
                                                    href={item.href}
                                                    onClick={() => {
                                                        setOpenSubmenuId(null);
                                                        setMenuOpen(false);
                                                    }}>
                                                    {item.labels.en}
                                                </a>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                    <a className={styles.cta} href={"https://booking.hydreight.com/widget-business/fk58k"}>Book Appointment</a>
                </div>
                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.openHamburger + ' disable-scroll' : ''}`}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                    onClick={() => {
                        setMenuOpen(open => !open);
                        setOpenSubmenuId(null);
                    }}>
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}
