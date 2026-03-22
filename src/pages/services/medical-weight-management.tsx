import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {Header} from "../../components/Navigation/Header/Header";
import {Footer} from "../../components/Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";
import styles from './service-hub.module.css';

const medications = [
    {
        tag: 'GLP-1',
        name: 'Semaglutide',
        description: 'A GLP-1 receptor agonist that works by mimicking a natural hormone to reduce appetite, slow gastric emptying, and improve blood sugar regulation — supporting sustainable, meaningful weight loss.',
        highlights: [
            'Reduces appetite and food cravings',
            'Slows digestion for longer satiety',
            'Supports blood sugar balance',
            'Weekly subcutaneous injection',
            'Personalized dosing titration',
        ],
    },
    {
        tag: 'GLP-1 / GIP',
        name: 'Tirzepatide',
        description: 'A dual GLP-1 and GIP receptor agonist offering enhanced metabolic effects. Tirzepatide targets two hormone pathways simultaneously, delivering powerful appetite suppression and metabolic improvement.',
        highlights: [
            'Dual-action hormone pathway targeting',
            'Greater average weight loss vs. GLP-1 alone',
            'Improves insulin sensitivity',
            'Weekly subcutaneous injection',
            'Personalized dosing titration',
        ],
    },
];

const programSteps = [
    {
        title: 'Consultation',
        description: 'A comprehensive intake with Rachel to review your health history, goals, and determine if GLP-1 therapy is appropriate for you.',
    },
    {
        title: 'Personalized Plan',
        description: 'A custom dosing schedule and program timeline tailored to your body, metabolism, and weight loss goals.',
    },
    {
        title: 'Ongoing Support',
        description: 'Regular check-ins to monitor progress, adjust dosing as needed, and support your journey with complementary wellness services.',
    },
    {
        title: 'Holistic Integration',
        description: 'Optional integration of IV therapy, peptides, or nutritional support to amplify your results and overall wellness.',
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
                            <h1 className={styles.heroTitle}>Medical Weight Management</h1>
                            <p className={styles.heroText}>
                                GLP-1 medications like Semaglutide and Tirzepatide help regulate appetite, support
                                metabolic health, and assist in sustainable weight loss — all within a medically
                                guided, personalized program.
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
                        <h2 className={styles.sectionTitle}>A Medical Approach to Lasting Change</h2>
                        <div className={styles.copy}>
                            <p>
                                Weight management is not a willpower problem — it is a metabolic and hormonal one.
                                GLP-1 and GLP-1/GIP medications work by directly addressing the biological drivers
                                of appetite, blood sugar regulation, and fat storage.
                            </p>
                            <p>
                                At The Road to Zero, our medical weight management programs are personalized,
                                medically supervised, and designed to complement your lifestyle — not disrupt it.
                                Rachel works closely with each client to create a dosing plan that is both effective
                                and well-tolerated, with ongoing monitoring and support throughout your journey.
                            </p>
                            <p>
                                These programs are best paired with healthy nutrition, movement, and complementary
                                wellness therapies such as IV hydration, peptide support, and metabolic injections
                                for optimal results.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="medications" className={styles.sectionAlt}>
                    <div className={styles.wide}>
                        <h2 className={styles.sectionTitle}>Medications We Offer</h2>
                        <p className={styles.sectionSubtitle}>
                            All medications are FDA-approved prescription therapies administered under the
                            supervision of a licensed medical provider. A consultation is required.
                        </p>
                        <div className={styles.treatmentsGrid}>
                            {medications.map(m => (
                                <div key={m.name} className={styles.treatmentCard}>
                                    <span className={styles.cardTag}>{m.tag}</span>
                                    <h3>{m.name}</h3>
                                    <p>{m.description}</p>
                                    <ul>
                                        {m.highlights.map(h => <li key={h}>{h}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="program" className={styles.section}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>How the Program Works</h2>
                        <div className={styles.highlightsGrid}>
                            {programSteps.map((step, i) => (
                                <div key={step.title} className={styles.highlightCard}>
                                    <h3>{`${i + 1}. ${step.title}`}</h3>
                                    <p>{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="complementary" className={styles.sectionAlt}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Complement Your Program</h2>
                        <div className={styles.copy}>
                            <p>
                                Maximize your weight management results by combining GLP-1 therapy with these
                                complementary services:
                            </p>
                        </div>
                        <div className={styles.tags}>
                            <a href="/services/iv-therapy/fat-burner" className={styles.tag}>Metabolism &amp; Fat Burner IV</a>
                            <a href="/services/iv-therapy/b12-injection" className={styles.tag}>B12 Injection</a>
                            <a href="/services/iv-therapy/b-complex-injection" className={styles.tag}>B-Complex Injection</a>
                            <a href="/services/iv-therapy/energy" className={styles.tag}>Energy IV</a>
                            <a href="/services/peptide-hormone-support" className={styles.tag}>Peptide &amp; Hormone Support</a>
                        </div>
                    </div>
                </section>

                <section id="book" className={styles.section}>
                    <div className={styles.ctaCard}>
                        <h2>Start Your Weight Management Journey</h2>
                        <p>
                            Book a consultation with Rachel to discuss your goals, review your health history,
                            and find the right program for your body.
                        </p>
                        <div className={styles.ctaActions}>
                            <Button
                                label="Book a Consultation"
                                href="https://booking.hydreight.com/widget-business/fk58k"
                                theme="primary"
                            />
                            <Button
                                label="View Body Transformation"
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
