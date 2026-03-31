import { useEffect, useId, useState } from 'react';
import styles from './Header.module.css';

type NavChild = { _key: string; label: string; href: string };
type NavItem = { _key: string; label: string; href: string; children?: NavChild[] };

type SocialLink = { platform: string; url: string };

type SiteSettings = {
  businessName: string;
  phone?: string;
  email?: string;
  bookingUrl?: string;
  socialLinks?: SocialLink[];
};

type Navigation = { items: NavItem[] };

const socialIcons: Record<string, string> = {
  facebook: '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M228,128A100,100,0,1,0,127.98877,228l.01123.001.01123-.001A100.11345,100.11345,0,0,0,228,128Zm-96,91.90771V148.001h28a4,4,0,0,0,0-8H132v-28a20.02229,20.02229,0,0,1,20-20h16a4,4,0,0,0,0-8H152a28.03145,28.03145,0,0,0-28,28v28H96a4,4,0,0,0,0,8h28v71.90673a92,92,0,1,1,8,0Z"></path></svg>',
  instagram: '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128,84a44,44,0,1,0,44,44A44.04978,44.04978,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36.04061,36.04061,0,0,1,128,164ZM172,32H84A52.059,52.059,0,0,0,32,84v88a52.059,52.059,0,0,0,52,52h88a52.059,52.059,0,0,0,52-52V84A52.059,52.059,0,0,0,172,32Zm44,140a44.04978,44.04978,0,0,1-44,44H84a44.04978,44.04978,0,0,1-44-44V84A44.04978,44.04978,0,0,1,84,40h88a44.04978,44.04978,0,0,1,44,44ZM188,76a8,8,0,1,1-8-8A8.00917,8.00917,0,0,1,188,76Z"></path></svg>',
  youtube: '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M162.21875,124.67188l-48-32A3.99967,3.99967,0,0,0,108,96v64a3.99987,3.99987,0,0,0,6.21875,3.32812l48-32a3.99979,3.99979,0,0,0,0-6.65624ZM116,152.52588V103.47412L152.78906,128Z"></path></svg>',
  tiktok: '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M224,80a52.059,52.059,0,0,1-52-52,4.0002,4.0002,0,0,0-4-4H128a4.0002,4.0002,0,0,0-4,4V156a24,24,0,1,1-34.28418-21.69238,3.99957,3.99957,0,0,0,2.28369-3.61279L92,89.05569a3.99948,3.99948,0,0,0-4.70117-3.938A72.00522,72.00522,0,1,0,172,156l-.00049-42.56348A99.27749,99.27749,0,0,0,224,128a4.0002,4.0002,0,0,0,4-4V84A4.0002,4.0002,0,0,0,224,80Z"></path></svg>',
  mail: '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M227.97314,55.7334a4.0173,4.0173,0,0,0-.04345-.43262c-.02246-.12671-.0586-.24707-.09229-.36914a3.84786,3.84786,0,0,0-.11719-.37744,3.91559,3.91559,0,0,0-.17236-.36475c-.05664-.11084-.11035-.22143-.17773-.32763a4.0245,4.0245,0,0,0-.26416-.35376c-.05518-.0691-.09717-.145-.15772-.21119-.01953-.021-.043-.03515-.0625-.05566a3.9161,3.9161,0,0,0-.33447-.29809c-.08789-.07374-.17188-.15357-.26465-.21851a3.9445,3.9445,0,0,0-.35547-.207c-.10693-.05933-.20947-.12525-.32031-.17407-.11963-.05274-.24707-.08692-.37207-.12793-.12207-.0398-.24121-.0857-.36572-.11353-.11719-.02612-.23926-.03467-.35987-.05029a3.90931,3.90931,0,0,0-.42675-.043C224.05713,52.00806,224.02979,52,224,52H32c-.0293,0-.05566.00781-.085.00854a4.05618,4.05618,0,0,0-.44385.04468c-.11426.01538-.23.0232-.34082.04785a4.00391,4.00391,0,0,0-.39355.12207c-.11524.03858-.2334.06983-.34375.11841-.11914.05225-.23.12281-.34473.187-.11182.06324-.227.12037-.33252.1941-.09619.06738-.18359.1499-.2749.2268a4.104,4.104,0,0,0-.32666.29126c-.01953.02075-.043.03491-.0625.05615-.06055.06617-.10254.14209-.15772.21119a4.02082,4.02082,0,0,0-.26416.35351c-.06738.10669-.12158.21753-.17822.32837-.061.11963-.12256.23779-.17187.364-.04786.12427-.082.25074-.11719.37818-.03369.12207-.06983.24219-.09229.36865a4.0173,4.0173,0,0,0-.04345.43262C28.021,55.82324,28,55.90869,28,56V192a12.01343,12.01343,0,0,0,12,12H216a12.01343,12.01343,0,0,0,12-12V56C228,55.90869,227.979,55.82324,227.97314,55.7334ZM213.71631,60,128,138.57373,42.28369,60ZM216,196H40a4.00427,4.00427,0,0,1-4-4V65.09326l89.29688,81.85547a4.00089,4.00089,0,0,0,5.40624,0L220,65.09326V192A4.00427,4.00427,0,0,1,216,196Z"></path></svg>',
  phone: '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M176,220C98.80371,220,36,157.19629,36,80A52.06484,52.06484,0,0,1,81.4209,28.41211a12.01552,12.01552,0,0,1,12.47558,7.19141L113.9873,82.48047a11.97729,11.97729,0,0,1-.99023,11.2998L96.36133,119.19922a3.938,3.938,0,0,0-.291,3.86035h.001a80.54061,80.54061,0,0,0,37.19726,37.0293,3.93771,3.93771,0,0,0,3.8711-.31836l25.03515-16.69434a11.96393,11.96393,0,0,1,11.38379-1.0459l46.83789,20.07325a12.01851,12.01851,0,0,1,7.19141,12.4746A52.06486,52.06486,0,0,1,176,220Z"></path></svg>',
};

interface Props {
  settings: SiteSettings;
  navigation: Navigation;
}

export default function HeaderClient({ settings, navigation }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const submenuIdPrefix = useId();

  const getSubmenuDomId = (itemKey: string) => `${submenuIdPrefix}-submenu-${itemKey}`;

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1110) {
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

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const submenuEl = document.getElementById(submenuDomId);
      const buttonEl = document.querySelector<HTMLButtonElement>(`button[aria-controls="${submenuDomId}"]`);
      if (!submenuEl?.contains(target) && !buttonEl?.contains(target)) {
        setOpenSubmenuId(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const buttonEl = document.querySelector<HTMLButtonElement>(`button[aria-controls="${submenuDomId}"]`);
        setOpenSubmenuId(null);
        queueMicrotask(() => buttonEl?.focus());
      }
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openSubmenuId, submenuIdPrefix]);

  const navItems = navigation?.items ?? [];
  const socialLinks = settings?.socialLinks ?? [];
  const bookingUrl = settings?.bookingUrl ?? '#';

  return (
    <header className={styles.header}>
      <a href="#main" className={styles.skipLink}>Skip to main content</a>

      <nav>
        <ul className={styles.socialLinks}>
          {socialLinks.map((link) => (
            <li key={link.platform}>
              <a
                href={link.url}
                aria-label={link.platform}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span dangerouslySetInnerHTML={{ __html: socialIcons[link.platform] ?? '' }} />
              </a>
            </li>
          ))}
          {settings?.email && (
            <li>
              <a href={`mailto:${settings.email}`} className={styles.socialLink} aria-label="Email">
                <span dangerouslySetInnerHTML={{ __html: socialIcons.mail }} />
                <span>{settings.email}</span>
              </a>
            </li>
          )}
          {settings?.phone && (
            <li>
              <a href={`tel:${settings.phone}`} className={styles.socialLink} aria-label="Phone">
                <span dangerouslySetInnerHTML={{ __html: socialIcons.phone }} />
                <span>{settings.phone}</span>
              </a>
            </li>
          )}
        </ul>
      </nav>

      <div className={styles.headerNavigation}>
        <a className={styles.logoAnchor} href="/">
          <div className={styles.companyName}>The Road to Zero</div>
          <div className={styles.companySub}>Aesthetics &amp; Wellness</div>
        </a>

        <div className={styles.headerContainer}>
          <div className={styles.navlinkcontainer}>
            <nav className={styles.navigationPages}>
              <ul className={styles.pageLinks}>
                {navItems.map((item) => {
                  const hasChildren = (item.children?.length ?? 0) > 0;
                  const submenuId = getSubmenuDomId(item._key);
                  const submenuOpen = openSubmenuId === item._key;

                  return (
                    <li key={item._key} className={styles.navItem}>
                      {hasChildren ? (
                        <>
                          <button
                            type="button"
                            className={styles.navButton}
                            aria-haspopup="menu"
                            aria-expanded={submenuOpen}
                            aria-controls={submenuId}
                            onClick={() =>
                              setOpenSubmenuId((cur) => (cur === item._key ? null : item._key))
                            }
                          >
                            {item.label}
                          </button>
                          <ul
                            id={submenuId}
                            className={`${styles.submenu} ${submenuOpen ? styles.submenuOpen : ''}`}
                            aria-label={`${item.label} submenu`}
                          >
                            {item.children!.map((child) => (
                              <li key={child._key} className={styles.submenuItem}>
                                <a
                                  className={styles.submenuLink}
                                  href={child.href}
                                  onClick={() => { setOpenSubmenuId(null); setMenuOpen(false); }}
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => { setOpenSubmenuId(null); setMenuOpen(false); }}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <a className={styles.cta} href={bookingUrl}>Book Appointment</a>
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.openHamburger + ' disable-scroll' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => { setMenuOpen((o) => !o); setOpenSubmenuId(null); }}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
