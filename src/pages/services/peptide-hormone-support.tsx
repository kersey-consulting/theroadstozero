import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {Header} from "../../components/Navigation/Header/Header";
import {Footer} from "../../components/Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";
import styles from './service-hub.module.css';

const therapies = [
    {
        tag: 'Growth Hormone Support',
        name: 'Sermorelin & CJC-1295',
        description: 'Growth hormone releasing peptides that stimulate the pituitary gland to naturally produce more growth hormone — supporting fat loss, muscle development, recovery, and deep sleep.',
        highlights: [
            'Stimulates natural growth hormone release',
            'Supports lean muscle development',
            'Improves sleep quality & recovery',
            'Promotes fat metabolism',
        ],
    },
    {
        tag: 'Recovery & Repair',
        name: 'BPC-157',
        description: 'A body protective compound with powerful healing and regenerative properties. BPC-157 supports tissue repair, reduces inflammation, and accelerates recovery from injury or intense training.',
        highlights: [
            'Accelerates tissue & tendon healing',
            'Reduces inflammation & pain',
            'Supports gut health',
            'Enhances workout recovery',
        ],
    },
    {
        tag: 'Fat Loss',
        name: 'AOD-9604',
        description: 'A modified fragment of human growth hormone specifically developed to stimulate fat breakdown without the blood sugar effects of full HGH — ideal for targeted body composition improvement.',
        highlights: [
            'Stimulates fat metabolism',
            'Supports body composition goals',
            'No impact on blood sugar',
            'Often combined with GLP-1 programs',
        ],
    },
    {
        tag: 'Energy & Performance',
        name: 'Ipamorelin',
        description: 'A highly selective growth hormone secretagogue that stimulates GH release with minimal side effects. Ipamorelin is popular for energy, recovery, improved sleep, and anti-aging support.',
        highlights: [
            'Clean growth hormone pulse stimulation',
            'Improved energy & vitality',
            'Better sleep & recovery',
            'Anti-aging cellular support',
        ],
    },
];

const benefits = [
    { title: 'Improved Recovery', description: 'Recover faster from workouts, illness, and the demands of daily life.' },
    { title: 'Better Sleep', description: 'Deeper, more restorative sleep supporting cellular repair and energy.' },
    { title: 'Enhanced Vitality', description: 'Feel more energized, motivated, and mentally clear throughout your day.' },
    { title: 'Hormone Optimization', description: 'Support natural hormone function for balance, mood, and longevity.' },
    { title: 'Body Composition', description: 'Build lean muscle, reduce stubborn fat, and transform your physique.' },
    { title: 'Personalized Care', description: 'Every protocol is individualized based on your health history and goals.' },
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
                            <h1 className={styles.heroTitle}>Peptide &amp; Hormone Support</h1>
                            <p className={styles.heroText}>
                                Targeted peptide therapies that support natural hormone function, improve recovery,
                                optimize sleep, and enhance vitality — helping your body perform and feel the way
                                it was designed to.
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
                    right={
                        <img
                            className={styles.heroImage}
                            src="/assets/home/peptide.png"
                            alt="Peptide & Hormone Support at The Road to Zero"
                        />
                    }
                />

                <section className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>What Are Peptides?</h2>
                        <div className={styles.copy}>
                            <p>
                                Peptides are short chains of amino acids — the building blocks of proteins — that act
                                as signaling molecules in the body. They communicate with cells, tissues, and organs
                                to regulate and optimize biological functions including hormone production, tissue
                                repair, metabolism, and immune response.
                            </p>
                            <p>
                                As we age, the levels of many of these naturally occurring peptides decline. Targeted
                                peptide therapy works by supplementing or stimulating these pathways, helping the body
                                restore its natural capacity for healing, energy, and hormonal balance.
                            </p>
                            <p>
                                At The Road to Zero, Rachel designs each peptide protocol around your specific health
                                goals, labs, and lifestyle — ensuring a safe, personalized, and effective approach.
                                A comprehensive consultation is required prior to beginning any peptide program.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.sectionAlt}>
                    <div className={styles.wide}>
                        <h2 className={styles.sectionTitle}>Peptide Therapies</h2>
                        <p className={styles.sectionSubtitle}>
                            All protocols are customized, medically supervised, and require a consultation prior
                            to starting. The following are examples of therapies that may be appropriate depending
                            on your health history and goals.
                        </p>
                        <div className={styles.treatmentsGrid}>
                            {therapies.map(t => (
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

                <section className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Benefits of Peptide Therapy</h2>
                        <div className={styles.highlightsGrid}>
                            {benefits.map(b => (
                                <div key={b.title} className={styles.highlightCard}>
                                    <h3>{b.title}</h3>
                                    <p>{b.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.sectionAlt}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Pair With Complementary Therapies</h2>
                        <div className={styles.copy}>
                            <p>
                                Peptide therapy works beautifully alongside other Road to Zero services for
                                amplified results:
                            </p>
                        </div>
                        <div className={styles.tags}>
                            <a href="/services/iv-therapy/athlete-recovery" className={styles.tag}>Athlete Recovery IV</a>
                            <a href="/services/iv-therapy/energy" className={styles.tag}>Energy IV</a>
                            <a href="/services/iv-therapy/fat-burner" className={styles.tag}>Metabolism &amp; Fat Burner IV</a>
                            <a href="/services/medical-weight-management" className={styles.tag}>Medical Weight Management</a>
                            <a href="/services/iv-therapy/b12-injection" className={styles.tag}>B12 Injection</a>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.ctaCard}>
                        <h2>Optimize Your Health from Within</h2>
                        <p>
                            Book a consultation with Rachel to explore whether peptide therapy is right for
                            your goals and health history.
                        </p>
                        <div className={styles.ctaActions}>
                            <Button
                                label="Book a Consultation"
                                href="https://booking.hydreight.com/widget-business/fk58k"
                                theme="primary"
                            />
                            <Button
                                label="Explore Body Transformation"
                                href="/services/body-transformation"
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
