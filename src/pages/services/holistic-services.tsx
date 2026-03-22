import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {Header} from "../../components/Navigation/Header/Header";
import {Footer} from "../../components/Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";
import styles from './service-hub.module.css';

const offerings = [
    {
        tag: 'Energy Healing',
        name: 'Reiki',
        description: 'Reiki is a Japanese energy healing modality that works by channeling universal life force energy through the practitioner\'s hands to promote relaxation, reduce stress, and support the body\'s natural healing processes.',
        highlights: [
            'Deep relaxation & stress relief',
            'Emotional balance & clarity',
            'Supports the body\'s natural healing',
            'Reduces anxiety & tension',
            'Promotes overall sense of well-being',
        ],
    },
    {
        tag: 'Mind-Body Alignment',
        name: 'Integrative Wellness Sessions',
        description: 'Holistic wellness conversations that address the connection between mind, body, and spirit — exploring stress, lifestyle, and emotional factors that influence your overall health and vitality.',
        highlights: [
            'Whole-person health assessment',
            'Stress and lifestyle guidance',
            'Emotional and mental wellness support',
            'Complement to medical treatments',
        ],
    },
];

const principles = [
    {
        title: 'Whole-Person Care',
        description: 'True wellness encompasses mind, body, and spirit — not just physical symptoms.',
    },
    {
        title: 'Complementary Healing',
        description: 'Holistic services work beautifully alongside medical treatments to deepen and sustain results.',
    },
    {
        title: 'Safe Space',
        description: 'Every session is held in a compassionate, non-judgmental space guided by Rachel\'s deep care for each client.',
    },
    {
        title: 'Inner Alignment',
        description: 'The goal is alignment — helping you feel at peace, energized, and connected to your truest self.',
    },
];

export function App() {
    return (
        <div>
            <Header />
            <main id="main" className={styles.page}>
                <Hero
                    backgroundImage="/assets/Sand.jpeg"
                    backgroundParallax={true}
                    theme="tertiary"
                    left={
                        <div className={styles.heroContent}>
                            <p className={styles.eyebrow}>Services</p>
                            <h1 className={styles.heroTitle}>Holistic Services</h1>
                            <p className={styles.heroText}>
                                Healing is not only physical. Rachel\'s holistic offerings address the mind, body, and
                                spirit connection — providing a deeper layer of restoration, balance, and inner
                                alignment alongside your wellness journey.
                            </p>
                            <div className={styles.heroActions}>
                                <Button
                                    label="Book a Session"
                                    href="https://booking.hydreight.com/widget-business/fk58k"
                                    theme="primary"
                                />
                                <Button
                                    label="View All Services"
                                    href="/services"
                                    theme="primary"
                                />
                            </div>
                        </div>
                    }
                    right={
                        <img
                            className={styles.heroImage}
                            src="/assets/home/holistic.jpg"
                            alt="Holistic Services at The Road to Zero"
                        />
                    }
                />

                <section className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>The Holistic Dimension of Wellness</h2>
                        <div className={styles.copy}>
                            <p>
                                The Road to Zero has always recognized that true healing encompasses more than the
                                physical body. Stress, emotional imbalance, and disconnection from oneself are among
                                the most common — and most overlooked — drivers of poor health and low vitality.
                            </p>
                            <p>
                                Rachel is a certified Reiki practitioner, and her holistic offerings are woven into
                                the same compassionate philosophy that guides all of her work: to meet each client
                                where they are and support their journey back to balance, wholeness, and radiant
                                well-being.
                            </p>
                            <p>
                                Whether experienced as a stand-alone session or integrated alongside medical
                                treatments, holistic services provide a meaningful layer of support for the nervous
                                system, the emotions, and the spirit.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.sectionAlt}>
                    <div className={styles.wide}>
                        <h2 className={styles.sectionTitle}>Holistic Offerings</h2>
                        <div className={styles.treatmentsGrid}>
                            {offerings.map(o => (
                                <div key={o.name} className={styles.treatmentCard}>
                                    <span className={styles.cardTag}>{o.tag}</span>
                                    <h3>{o.name}</h3>
                                    <p>{o.description}</p>
                                    <ul>
                                        {o.highlights.map(h => <li key={h}>{h}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Our Guiding Principles</h2>
                        <div className={styles.highlightsGrid}>
                            {principles.map(p => (
                                <div key={p.title} className={styles.highlightCard}>
                                    <h3>{p.title}</h3>
                                    <p>{p.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.sectionAlt}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>About Rachel&apos;s Holistic Practice</h2>
                        <div className={styles.copy}>
                            <p>
                                Rachel is a certified Reiki practitioner whose journey into holistic healing grew
                                from her years supporting clients through some of life\'s most profound moments —
                                birth, illness, and the end of life.
                            </p>
                            <p>
                                These experiences gave her a profound understanding of the human spirit and the
                                deep need for care that goes beyond the physical. Her holistic sessions are offered
                                with warmth, intention, and the utmost respect for each client\'s unique journey.
                            </p>
                        </div>
                        <div className={styles.tags}>
                            <span className={styles.tag}>Certified Reiki Practitioner</span>
                            <span className={styles.tag}>Registered Nurse</span>
                            <span className={styles.tag}>Midwife</span>
                            <span className={styles.tag}>Hospice Care Experience</span>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Pair With Wellness Treatments</h2>
                        <div className={styles.copy}>
                            <p>
                                Holistic sessions pair beautifully with other Road to Zero services for a
                                truly integrated wellness experience:
                            </p>
                        </div>
                        <div className={styles.tags}>
                            <a href="/services/iv-therapy/myers-cocktail" className={styles.tag}>Myers Cocktail IV</a>
                            <a href="/services/iv-therapy/energy" className={styles.tag}>Energy IV</a>
                            <a href="/services/iv-therapy/immune" className={styles.tag}>Immune Boost IV</a>
                            <a href="/services/peptide-hormone-support" className={styles.tag}>Peptide &amp; Hormone Support</a>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.ctaCard}>
                        <h2>Restore Balance. Reconnect Within.</h2>
                        <p>
                            Book a holistic session with Rachel and take a meaningful step toward mind, body,
                            and spirit alignment.
                        </p>
                        <div className={styles.ctaActions}>
                            <Button
                                label="Book a Session"
                                href="https://booking.hydreight.com/widget-business/fk58k"
                                theme="primary"
                            />
                            <Button
                                label="Learn About Rachel"
                                href="/about"
                                theme="primary"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
