import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css'
import {Header} from "../components/Navigation/Header/Header";
import {Footer} from "../components/Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";
import styles from "./about.module.css";

export function App() {
    return <div>
        <Header />
        <main id={'main'} className={styles.page}>
            <Hero
                backgroundImage={'/assets/Sand.jpeg'}
                theme={'tertiary'}
                backgroundParallax={true}
                left={
                    <div className={styles.heroContent}>
                        <p className={styles.eyebrow}>About Rachel</p>
                        <h1 className={styles.heroTitle}>Compassionate care for the whole person</h1>
                        <p className={styles.heroText}>
                            Registered Nurse, Midwife, licensed healthcare Administrator, certified IV therapy provider,
                            Botulinum and Dermal Filler clinician, and Reiki practitioner.
                        </p>
                        <p className={styles.heroText}>
                            Rachel’s mission is to help clients feel rejuvenated, confident, and aligned through
                            personalized care that supports mind, body, and spirit.
                        </p>
                        <div className={styles.heroActions}>
                            <Button
                                label={'Book a Consultation'}
                                href={'https://booking.hydreight.com/widget-business/fk58k'}
                                theme={'primary'}
                            />
                            <Button
                                label={'Explore Services'}
                                href={'/services'}
                                theme={'primary'}
                            />
                        </div>
                    </div>
                }
                right={
                    <img
                        className={styles.heroImage}
                        src="/assets/MyPicture_356x475.jpeg"
                        alt="Rachel"
                    />
                }
            />

            <section className={styles.section}>
                <div className={styles.narrow}>
                    <h2 className={styles.sectionTitle}>A life devoted to caring for others</h2>
                    <div className={styles.copy}>
                        <p>
                            Rachel has had the blessing of supporting life at both its beginning and its end.
                            Welcoming new life into the world as a midwife and walking alongside individuals and
                            families during the end-of-life journey in hospice care.
                        </p>
                        <p>
                            These experiences gave her a deep appreciation for the full spectrum of life and a
                            compassionate understanding of what it means to truly care for others.
                        </p>
                        <p>
                            Her personal journey began with a search for balance, self-discovery, self-love, and healing.
                            Over time, that journey evolved into a professional mission: creating a safe, nurturing, and
                            holistic space where wellness begins from within.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.sectionAlt}>
                <div className={styles.narrow}>
                    <h2 className={styles.sectionTitleCentered}>Credentials & Specialties</h2>
                    <div className={styles.credentialsGrid}>
                        <div className={styles.card}>
                            <h3>Clinical Background</h3>
                            <ul className={styles.list}>
                                <li>Registered Nurse</li>
                                <li>Midwife</li>
                                <li>Licensed healthcare Administrator</li>
                            </ul>
                        </div>
                        <div className={styles.card}>
                            <h3>Wellness Services</h3>
                            <ul className={styles.list}>
                                <li>Certified IV therapy provider</li>
                                <li>GLP-1 support</li>
                                <li>Peptide and hormone wellness support</li>
                            </ul>
                        </div>
                        <div className={styles.card}>
                            <h3>Aesthetic & Holistic Care</h3>
                            <ul className={styles.list}>
                                <li>Botulinum clinician</li>
                                <li>Dermal Filler clinician</li>
                                <li>Reiki practitioner</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Hero
                theme={'tertiary'}
                left={
                    <div className={styles.storyBlock}>
                        <h2 className={styles.sectionTitle}>A holistic approach to wellness and confidence</h2>
                        <div className={styles.copy}>
                            <p>
                                Whether you are seeking stress relief, emotional or physical balance, increased energy,
                                hormone support, weight management, or cosmetic rejuvenation, Rachel’s goal is to guide
                                you toward feeling your absolute best.
                            </p>
                            <p>
                                Her approach blends medical knowledge, aesthetic expertise, and holistic care to support
                                lasting wellness from the inside out.
                            </p>
                            <p>
                                Every experience is designed to feel personal, supportive, and grounded in compassion.
                            </p>
                        </div>
                    </div>
                }
                right={
                    <div className={styles.valuesCard}>
                        <h3 className={styles.valuesTitle}>What clients may be looking for</h3>
                        <ul className={styles.list}>
                            <li>Stress relief and renewed balance</li>
                            <li>Improved energy and recovery</li>
                            <li>Hormone and wellness support</li>
                            <li>Weight management guidance</li>
                            <li>Natural-looking cosmetic rejuvenation</li>
                            <li>Mind, body, and spirit alignment</li>
                        </ul>
                    </div>
                }
            />

            <section className={styles.section}>
                <div className={styles.narrow}>
                    <h2 className={styles.sectionTitleCentered}>Services Rachel is honored to offer</h2>
                    <div className={styles.serviceTags}>
                        <span className={styles.tag}>IV Therapy</span>
                        <span className={styles.tag}>GLP-1 Medications</span>
                        <span className={styles.tag}>Peptides</span>
                        <span className={styles.tag}>Aesthetic Treatments</span>
                        <span className={styles.tag}>Botulinum</span>
                        <span className={styles.tag}>Dermal Fillers</span>
                        <span className={styles.tag}>Reiki</span>
                    </div>
                    <p className={styles.centeredText}>
                        Rachel looks forward to sharing the restorative and empowering benefits of these services in a
                        way that feels thoughtful, personalized, and aligned with each client’s goals.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.ctaCard}>
                    <h2 className={styles.sectionTitleCentered}>Thank you for trusting Rachel with your wellness journey</h2>
                    <p className={styles.centeredText}>
                        If you are ready to feel more rejuvenated, confident, and supported, Rachel would be honored to
                        walk alongside you.
                    </p>
                    <div className={styles.ctaActions}>
                        <Button
                            label={'Book Appointment'}
                            href={'https://booking.hydreight.com/widget-business/fk58k'}
                            theme={'primary'}
                        />
                        <Button
                            label={'View Services'}
                            href={'/services'}
                            theme={'primary'}
                        />
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </div>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
