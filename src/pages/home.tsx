import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css'
import {Header} from "../components/Navigation/Header/Header";
import {Footer} from "../components/Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";
import {ProductCard} from "@/components/Product-Card";
import styles from './home.module.css';

const products = [
    {
        imagePath: '/assets/Sand.jpeg',
        title: 'IV Therapy & Vitamin Infusions',
        subtext: (
            <>
                <p>
                    Restore hydration, replenish nutrients, and support immune function with customized IV infusions and
                    vitamin injections.
                </p>
                <p>Examples:</p>
                <ul>
                    <li>Myers Cocktail</li>
                    <li>Immunity Boost</li>
                    <li>Beauty & Anti-Aging</li>
                    <li>Detox & Hangover Recovery</li>
                    <li>Athletic Recovery</li>
                </ul>
            </>
        ),
        button: {
            label: 'Learn More',
            href: '/services/iv-therapy',
        },
    },
    {
        imagePath: '/assets/Sand.jpeg',
        title: 'Medical Weight Management',
        subtext: (
            <>
                <p>
                    GLP-1 medications like Semaglutide and Tirzepatide help regulate appetite, support metabolic health,
                    and assist in sustainable weight loss.
                </p>
                <p>
                    Our programs are medically guided and personalized for your body and lifestyle.
                </p>
            </>
        ),
        button: {
            label: 'Learn More',
            href: '/services/medical-weight-management',
        },
    },
    {
        imagePath: '/assets/Sand.jpeg',
        title: 'Aesthetic Treatments',
        subtext: (
            <>
                <p>
                    Subtle, natural-looking enhancements designed to refresh your appearance without looking overdone.
                </p>
                <p>Services include:</p>
                <ul>
                    <li>Botox</li>
                    <li>Dermal Fillers</li>
                    <li>Skin rejuvenation treatments</li>
                    <li>PRP hair restoration</li>
                </ul>
            </>
        ),
        button: {
            label: 'Learn More',
            href: '/services/aesthetic-treatments',
        },
    },
    {
        imagePath: '/assets/Sand.jpeg',
        title: 'Peptide & Hormone Support',
        subtext: (
            <>
                <p>
                    Peptide therapy supports natural hormone function, improved recovery, better sleep, and enhanced
                    vitality.
                </p>
                <p>
                    These treatments help optimize performance, energy levels, and overall wellness.
                </p>
            </>
        ),
        button: {
            label: 'Learn More',
            href: '/services/peptide-hormone-support',
        },
    },
];

export function App() {
    return <div>
        <Header/>
        <main id={'main'} className={styles.page}>
            <Hero
                backgroundImage={'/assets/Sand.jpeg'}
                theme={'tertiary'}
                left={
                    <div className={styles.heroContent}>
                        <h1>The Road to Zero</h1>
                        <h2>Medical Wellness, IV Therapy & Aesthetics</h2>
                        <p>
                            RN-led wellness and aesthetic treatments designed to restore balance, boost vitality, and
                            enhance natural confidence. Personalized, science-backed care in a calm and intentional
                            environment.
                        </p>
                        <div className={styles.heroActions}>
                            <Button label={'Book a Consultation'} theme={'primary'} size={'large'}/>
                            <Button label={'Explore Our Services'} href={'/services'} theme={'secondary'} size={'large'}/>
                        </div>
                        <p className={styles.heroEyebrow}>RN-Led • Licensed Medical Provider • Personalized Care</p>
                    </div>
                }
            />

            <section className={styles.narrowSection}>
                <div className={styles.intro}>
                    <h2 className={styles.sectionHeader}>Restore Balance. Reclaim Vitality. Renew Confidence.</h2>
                    <p>
                        At The Road to Zero, wellness and aesthetics come together through personalized, medically guided
                        care. Our treatments support your body’s natural ability to restore balance, recover from stress,
                        and enhance your natural beauty.
                    </p>
                    <p>We focus on:</p>
                    <ul className={styles.introList}>
                        <li>Restoring hydration, nutrients, and cellular energy</li>
                        <li>Supporting metabolism, hormones, and recovery</li>
                        <li>Enhancing natural aesthetics with a conservative approach</li>
                        <li>Helping you feel aligned in mind, body, and spirit</li>
                    </ul>
                    <p>Book your consultation and begin your journey back to balance.</p>
                    <div className={styles.introAction}>
                        <Button label={'Start Your Wellness Journey'} />
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionHeaderCentered}>Our Services</h2>
                <div className={styles.servicesGrid}>
                    {products.map((product) => (
                        <ProductCard
                            key={product.title}
                            imagePath={product.imagePath}
                            title={product.title}
                            subtext={product.subtext}
                            button={product.button}
                        />
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionHeader}>Why The Road to Zero?</h2>
                <div className={styles.whyIntro}>
                    <p>The Road to Zero represents a return to balance where health, beauty, and vitality naturally thrive.</p>
                    <p>
                        In today’s fast-paced world, stress, toxins, inflammation, and lifestyle demands push our bodies
                        away from equilibrium.
                    </p>
                    <p>Our mission is to help guide you back.</p>
                </div>

                <div className={styles.valuesGrid}>
                    <div className={styles.valueCard}>
                        <h3>Zero Stress</h3>
                        <p>Calming the nervous system and supporting emotional balance.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <h3>Zero Depletion</h3>
                        <p>Restoring hydration, essential nutrients, and energy.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <h3>Zero Imbalance</h3>
                        <p>Supporting hormonal, metabolic, and cellular health.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <h3>Zero Barriers</h3>
                        <p>Providing accessible wellness treatments that meet you where you are.</p>
                    </div>
                </div>

                <p className={styles.whyClosing}>
                    Healing is a journey, not a shortcut. We are here to walk that road with you.
                </p>
            </section>

            <Hero
                theme={'tertiary'}
                left={
                    <div className={styles.profileText}>
                        <h2>Meet Rachel</h2>
                        <div className={styles.profileCopy}>
                            <p>RN, Midwife, Certified IV Therapy Provider Botox & Dermal Filler Clinician, Reiki Practitioner</p>
                            <p>
                                Rachel has spent her career caring for individuals across the full spectrum of life,
                                from welcoming new life as a midwife to supporting families during end-of-life care in hospice.
                            </p>
                            <p>
                                These experiences shaped her deep understanding of what it truly means to care for others.
                            </p>
                            <p>
                                Her personal journey of healing and balance inspired the creation of The Road to Zero, a
                                space dedicated to helping individuals restore vitality, confidence, and inner alignment.
                            </p>
                            <p>
                                Through personalized wellness therapies and aesthetic treatments, Rachel’s mission is to
                                help every client feel their absolute best, mind, body, and spirit.
                            </p>
                            <Button label={'Learn More About Rachel'}/>
                        </div>
                    </div>
                }
                right={
                    <img
                        className={styles.profileImage}
                        src="/assets/MyPicture_356x475.jpeg"
                        alt="Rachel"
                    />
                }
            />
        </main>
        <Footer/>
    </div>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
