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
        imagePath: '/assets/home/Aesthetics.png',
        title: 'Aesthetic Treatments',
        subtext: (
            <>
                <p>
                    Subtle, natural-looking enhancements designed to refresh your appearance without looking overdone.
                </p>
                <p>Services include:</p>
                <ul>
                    <li>Botulinum</li>
                    <li>Dermal Fillers</li>
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
        imagePath: '/assets/home/Hormone.png',
        title: 'Body Transformation',
        subtext: (
            <>
                <p>

                </p>
                <p>

                </p>
            </>
        ),
        button: {
            label: 'Learn More',
            href: '/services/peptide-hormone-support',
        },
    },
    {
        imagePath: '/assets/home/IV.png',
        title: 'IV Therapy & Vitamin Injections',
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
        imagePath: '/assets/home/GLP-1.png',
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
        imagePath: '/assets/home/peptide.png',
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
    {
        imagePath: '/assets/home/holistic.jpg',
        title: 'Holistic Services',
        subtext: (
            <>
                <p>

                </p>
                <p>

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
                backgroundImage={'/assets/Sand2.png'}
                theme={'tertiary'}
                backgroundParallax={true}
                left={
                <div>
                    <img className={styles.logo} src="/icons/gold-ring-logo.png" alt="The Roads to Zero Logo" />
                    <div></div>
                </div>
                }
                right={
                <div style={{display: 'flex', gap: '2rem'}}>
                    <div className={styles.heroContent}>
                        <p>
                            Welcome to our sanctuary for Wellness, Beauty, and Transformative balance. Your journey toward confidence, vitality, and restoration begins here.
                            We believe true Glow comes from within, nourishing the body, uplifting the spirit, and enhancing the natural beauty you already possess.
                            <br/><br/>With science-backed treatments, a personalized approach, and holistic care, we’re here to help you reset, restore, and realign with your best self.
                            From IV hydration and peptides to hormone support, GLP therapy, and aesthetic enhancements, every service is crafted to elevate your well-being.
                            <br/><br/>Step into a space dedicated to renewal, and allow us to guide you toward total rejuvenation because you deserve to look, feel, and live your most vibrant, balanced, and radiant life.
                        </p>
                        <div className={styles.heroActions}>
                            <Button label={'Book a Consultation'} href={'https://booking.hydreight.com/widget-business/fk58k'} theme={'primary'} size={'medium'}/>
                            <Button label={'Explore Our Services'} href={'/services'} theme={'primary'} size={'medium'}/>
                        </div>
                    </div>
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
                        <li>Enhancing natural aesthetics with a conservative approach</li>
                        <li>Supporting metabolism, hormones, and recovery</li>
                        <li>Restoring hydration, nutrients, and cellular energy</li>
                        <li>Guiding you feel aligned in mind, body, and spirit</li>
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
                        <h2>About Us</h2>
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
                            <Button label={'Learn More About The Raod to Zero'} href={'/about'}/>
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
            <section className={styles.section}>
                <div className={styles.mobileServiceCard}>
                    <div className={styles.mobileServiceContent}>
                        <h2 className={styles.sectionHeader}>We Bring Wellness to You</h2>
                        <p>
                            Our concierge services allow you to receive treatments in the comfort of your home or at your business.
                        </p>
                        <p>We provide services at:</p>
                        <ul className={styles.mobileServiceList}>
                            <li>Private residences</li>
                            <li>Corporate offices</li>
                            <li>Spas and salons</li>
                            <li>Fitness centers</li>
                            <li>Yoga and wellness studios</li>
                            <li>Special events and private parties</li>
                        </ul>
                        <p>
                            Wellness should be convenient, comfortable, and personalized.
                        </p>
                        <div className={styles.mobileServiceAction}>
                            <Button label={'Book Mobile Service'} href={'/mobile-services'} />
                        </div>
                    </div>
                </div>
            </section>

            <Hero
                theme={'tertiary'}
                left={
                    <div>
                        <h2>Referral Rewards Program</h2>
                        <p>
                            Share our aesthetic and wellness services with friends and earn income or complimentary services, Plus earn an ongoing 3% override bonus from referrals your referred clients generate.
                        </p>
                        <p>Clients who refer others may receive rewards including:</p>
                        <ul>
                            <li>Botox treatments</li>
                            <li>Dermal fillers</li>
                            <li>IV hydration sessions</li>
                            <li>Vitamin injections</li>
                            <li>Peptide therapy</li>
                        </ul>
                        <div>
                            <Button label={'Learn About the Referral Program'} href={'/referral-program'} />
                        </div>
                    </div>
                }
                right={
                    <img
                        src="/assets/home/Referral.webp"
                        alt="Rachel"
                    />
                }
            />

            <section className={styles.section}>
                <div className={styles.finalCta}>
                    <div className={styles.finalCtaContent}>
                        <h2 className={styles.finalCtaHeading}>Begin Your Journey Back to Balance</h2>
                        <p>
                            You deserve to feel energized, confident, and aligned.
                        </p>
                        <p>
                            Book your consultation today and take the first step toward restoring your health and vitality.
                        </p>
                        <div className={styles.finalCtaAction}>
                            <Button label={'Book Appointment'} href={'https://booking.hydreight.com/widget-business/fk58k'} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
    </div>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
