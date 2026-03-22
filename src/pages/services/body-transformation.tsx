import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {Header} from "../../components/Navigation/Header/Header";
import {Footer} from "../../components/Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";
import styles from './service-hub.module.css';

const pillars = [
    {
        tag: 'Weight Management',
        name: 'GLP-1 Medications',
        description: 'Medically supervised GLP-1 and GLP-1/GIP receptor agonists (Semaglutide, Tirzepatide) regulate appetite, support metabolic health, and assist in sustainable fat loss.',
        highlights: [
            'Reduces appetite and cravings',
            'Supports blood sugar regulation',
            'Promotes sustainable fat loss',
            'Personalized dosing plans',
        ],
    },
    {
        tag: 'Hormone & Recovery',
        name: 'Peptide & Hormone Support',
        description: 'Targeted peptide therapies support natural hormone function, improve recovery, optimize sleep quality, and enhance overall energy — helping your body perform at its best.',
        highlights: [
            'Growth hormone optimization',
            'Improved recovery & sleep',
            'Increased energy & vitality',
            'Body composition support',
        ],
    },
    {
        tag: 'Cellular Nutrition',
        name: 'IV Metabolism Support',
        description: 'Our Metabolism & Fat Burner IV delivers amino acids, B vitamins, and lipotropic compounds directly to the bloodstream — accelerating fat metabolism and boosting energy at the cellular level.',
        highlights: [
            'Boosts metabolism & fat burning',
            'Increases natural energy',
            'Supports liver health',
            'Enhances workout performance',
        ],
    },
    {
        tag: 'Injections',
        name: 'Lipotropic Injections',
        description: 'MIC (Methionine, Inositol, Choline) and B12 injections assist with fat mobilization, liver detox, and metabolic support — a popular weekly or biweekly add-on to any transformation program.',
        highlights: [
            'Fat mobilization support',
            'Liver detox assistance',
            'Energy & mood improvement',
            'Appetite and craving support',
        ],
    },
];

const outcomes = [
    { title: 'Sustainable Fat Loss', description: 'Programs designed for lasting results, not quick fixes.' },
    { title: 'Improved Body Composition', description: 'Reduce fat, support lean muscle, and optimize how you feel.' },
    { title: 'Elevated Energy', description: 'Feel stronger and more energized throughout your transformation.' },
    { title: 'Medically Guided', description: 'Every program is supervised by a licensed medical provider.' },
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
                            <h1 className={styles.heroTitle}>Body Transformation</h1>
                            <p className={styles.heroText}>
                                A comprehensive, medically guided approach to transforming your body — combining weight
                                management, hormone support, and cellular nutrition to help you look, feel, and perform
                                at your best.
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

                <section id="overview" className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>A Whole-Body Approach</h2>
                        <div className={styles.copy}>
                            <p>
                                True body transformation goes beyond diet and exercise. Hormones, metabolism, cellular
                                nutrition, and recovery all play critical roles in how your body looks and feels.
                            </p>
                            <p>
                                At The Road to Zero, we address body transformation from the inside out — combining
                                medically supervised weight management, targeted peptide and hormone support, and
                                IV-delivered cellular nutrition to create a personalized program built around your goals.
                            </p>
                            <p>
                                All programs are supervised by Rachel, a Registered Nurse with extensive experience in
                                personalized wellness care. Your health, safety, and results are always the priority.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="pillars" className={styles.sectionAlt}>
                    <div className={styles.wide}>
                        <h2 className={styles.sectionTitle}>Transformation Pillars</h2>
                        <p className={styles.sectionSubtitle}>
                            Our body transformation programs draw from multiple evidence-based approaches,
                            personalized to your unique needs and goals.
                        </p>
                        <div className={styles.treatmentsGrid}>
                            {pillars.map(p => (
                                <div key={p.name} className={styles.treatmentCard}>
                                    <span className={styles.cardTag}>{p.tag}</span>
                                    <h3>{p.name}</h3>
                                    <p>{p.description}</p>
                                    <ul>
                                        {p.highlights.map(h => <li key={h}>{h}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="outcomes" className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>What to Expect</h2>
                        <div className={styles.highlightsGrid}>
                            {outcomes.map(o => (
                                <div key={o.title} className={styles.highlightCard}>
                                    <h3>{o.title}</h3>
                                    <p>{o.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="programs" className={styles.sectionAlt}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Explore Specific Programs</h2>
                        <div className={styles.copy}>
                            <p>
                                Ready to dive deeper? Explore the individual programs that make up our Body
                                Transformation approach:
                            </p>
                        </div>
                        <div className={styles.tags}>
                            <a href="/services/medical-weight-management" className={styles.tag}>Medical Weight Management</a>
                            <a href="/services/peptide-hormone-support" className={styles.tag}>Peptide &amp; Hormone Support</a>
                            <a href="/services/iv-therapy/fat-burner" className={styles.tag}>Metabolism &amp; Fat Burner IV</a>
                            <a href="/services/iv-therapy/energy" className={styles.tag}>Energy IV</a>
                            <a href="/services/iv-therapy/b12-injection" className={styles.tag}>B12 Injection</a>
                        </div>
                    </div>
                </section>

                <section id="book" className={styles.section}>
                    <div className={styles.ctaCard}>
                        <h2>Begin Your Transformation</h2>
                        <p>
                            Book a consultation with Rachel and create a personalized plan that works for your
                            body, your goals, and your life.
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
