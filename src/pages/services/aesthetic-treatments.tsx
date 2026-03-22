import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {Header} from "../../components/Navigation/Header/Header";
import {Footer} from "../../components/Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";
import styles from './service-hub.module.css';

const treatments = [
    {
        tag: 'Wrinkle Relaxing',
        name: 'Botulinum Toxin',
        description: 'Botulinum is used to restore what time, stress, and gravity have taken — not to change identity. Rachel\'s philosophy centers on facial balance, proportion, and natural restoration.',
        highlights: [
            'Forehead lines & frown lines (11s)',
            'Crow\'s feet & brow lift',
            'Lip flip & chin dimpling',
            'Jaw slimming (masseter)',
            'Hyperhidrosis (excessive sweating)',
        ],
    },
    {
        tag: 'Volume Restoration',
        name: 'Dermal Fillers',
        description: 'Hyaluronic acid fillers restore lost volume, smooth deeper lines, and enhance natural contours — all with a conservative hand and a focus on looking refreshed, never overdone.',
        highlights: [
            'Lip enhancement & definition',
            'Cheek & mid-face volume',
            'Nasolabial folds & marionette lines',
            'Under-eye hollows (tear troughs)',
            'Jawline & chin contouring',
        ],
    },
    {
        tag: 'Hair Restoration',
        name: 'PRP Hair Restoration',
        description: 'Platelet-Rich Plasma (PRP) therapy uses your body\'s own growth factors to stimulate hair follicles, encourage regrowth, and restore thickness — a natural, non-surgical approach.',
        highlights: [
            'Thinning hair & early hair loss',
            'Male & female pattern hair loss',
            'Hairline restoration support',
            'Scalp health & follicle stimulation',
        ],
    },
];

const philosophy = [
    {
        title: 'Natural First',
        description: 'Every treatment begins with your natural structure. We enhance what\'s already there — never change who you are.',
    },
    {
        title: 'Conservative Touch',
        description: 'Results should be noticed as looking refreshed and rested — not as having had work done.',
    },
    {
        title: 'Facial Balance',
        description: 'We assess proportion, symmetry, and overall facial harmony before recommending any treatment.',
    },
    {
        title: 'Personalized Plans',
        description: 'Every consultation is unique. Your goals, anatomy, and timeline guide every decision.',
    },
];

export function App() {
    return (
        <div>
            <Header />
            <main id="main" className={styles.page}>
                <Hero
                    id="hero"
                    backgroundImage="/assets/Sand.jpeg"
                    backgroundParallax={true}
                    theme="tertiary"
                    left={
                        <div className={styles.heroContent}>
                            <p className={styles.eyebrow}>Services</p>
                            <h1 className={styles.heroTitle}>Aesthetic Treatments</h1>
                            <p className={styles.heroText}>
                                Subtle, natural-looking enhancements designed to restore balance and refresh your
                                appearance — without looking overdone. Because true beauty is a return to your most
                                vibrant, natural self.
                            </p>
                            <div className={styles.heroActions}>
                                <Button
                                    label="Book a Consultation"
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
                />

                <section id="philosophy" className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Our Philosophy on Aesthetics</h2>
                        <div className={styles.copy}>
                            <p>
                                At The Road to Zero, aesthetic treatment is about returning the face to its natural
                                structure and symmetry — to enhance what you have and restore what time has taken,
                                not to change your identity.
                            </p>
                            <p>
                                Rachel brings a medically trained eye and a conservative hand to every treatment.
                                Trained through the American Academy of Cosmetic Medicine (AACM), Aesthetic Medical
                                Educators Training (AMET), and Empire Medical, her approach is rooted in anatomy,
                                proportion, and balance.
                            </p>
                            <p>
                                Whether you're looking to soften fine lines, restore lost volume, or simply feel more
                                refreshed — every treatment plan is personalized to your goals and your face.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="treatments" className={styles.sectionAlt}>
                    <div className={styles.wide}>
                        <h2 className={styles.sectionTitle}>Treatments Offered</h2>
                        <p className={styles.sectionSubtitle}>
                            All treatments are performed by or under the supervision of a licensed medical provider.
                            A consultation is required prior to treatment.
                        </p>
                        <div className={styles.treatmentsGrid}>
                            {treatments.map(t => (
                                <div key={t.name} className={styles.treatmentCard}>
                                    <span className={styles.cardTag}>{t.tag}</span>
                                    <h3>{t.name}</h3>
                                    <p>{t.description}</p>
                                    <ul>
                                        {t.highlights.map(h => <li key={h}>{h}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="approach" className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Our Approach</h2>
                        <div className={styles.highlightsGrid}>
                            {philosophy.map(p => (
                                <div key={p.title} className={styles.highlightCard}>
                                    <h3>{p.title}</h3>
                                    <p>{p.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="credentials" className={styles.sectionAlt}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Credentials &amp; Training</h2>
                        <div className={styles.copy}>
                            <p>
                                Rachel holds certifications from the leading aesthetic medicine training institutions,
                                ensuring every treatment is grounded in the highest standards of safety, skill, and care.
                            </p>
                        </div>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoCard}>
                                <h3>Training &amp; Certifications</h3>
                                <ul className={styles.infoList}>
                                    <li>American Academy of Cosmetic Medicine (AACM)</li>
                                    <li>Aesthetic Medical Educators Training (AMET)</li>
                                    <li>Empire Medical</li>
                                </ul>
                            </div>
                            <div className={styles.infoCard}>
                                <h3>Clinical Background</h3>
                                <ul className={styles.infoList}>
                                    <li>Registered Nurse (RN)</li>
                                    <li>Midwife</li>
                                    <li>Licensed Healthcare Administrator</li>
                                </ul>
                            </div>
                            <div className={styles.infoCard}>
                                <h3>Specialties</h3>
                                <ul className={styles.infoList}>
                                    <li>Botulinum &amp; Neuromodulators</li>
                                    <li>Dermal Filler Clinician</li>
                                    <li>PRP Therapy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="book" className={styles.section}>
                    <div className={styles.ctaCard}>
                        <h2>Ready to Begin Your Aesthetic Journey?</h2>
                        <p>
                            Book a personalized consultation with Rachel and discover what's possible with a
                            conservative, natural approach to aesthetic care.
                        </p>
                        <div className={styles.ctaActions}>
                            <Button
                                label="Book a Consultation"
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
