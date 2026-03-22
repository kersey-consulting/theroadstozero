import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {Header} from "../../components/Navigation/Header/Header";
import {Footer} from "../../components/Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";
import styles from './iv-therapy.module.css';

type ServiceCard = {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    keyBenefits: string[];
    type: 'drip' | 'injection';
};

const ivDrips: ServiceCard[] = [
    {
        slug: 'plain-hydration',
        name: 'Plain Hydration',
        tagline: 'Restore. Replenish. Rebalance.',
        description: 'A pure Lactated Ringer solution to rapidly restore hydration and replenish essential electrolytes. Gentle, effective, and fast-acting — the perfect foundation for recovery.',
        keyBenefits: ['Rapid hydration', 'Replenishes electrolytes', 'Pre/post event support'],
        type: 'drip',
    },
    {
        slug: 'athlete-recovery',
        name: 'Athlete Recovery',
        tagline: 'Replenish. Restore. Perform.',
        description: 'Designed to rehydrate, replenish nutrients, reduce muscle soreness, and accelerate recovery after intense training, workouts, or competitions.',
        keyBenefits: ['Rapid rehydration', 'Reduces muscle soreness & cramps', 'Boosts energy & mental focus'],
        type: 'drip',
    },
    {
        slug: 'beauty-youth',
        name: 'Beauty & Youth',
        tagline: 'Hydrate. Rejuvenate. Shine.',
        description: 'Supports glowing skin, hair, and nails while promoting cellular health, anti-aging, and overall vitality. Your ultimate beauty boost from the inside out.',
        keyBenefits: ['Radiant, glowing skin', 'Stronger hair & nails', 'Anti-aging cellular support'],
        type: 'drip',
    },
    {
        slug: 'immune',
        name: 'Immune Boost',
        tagline: 'Defend. Recover. Thrive.',
        description: 'Strengthens the body\'s natural defenses, fights off infections, and supports overall wellness. Especially popular during cold & flu season, travel, or times of high stress.',
        keyBenefits: ['Strengthens immunity', 'Faster recovery from illness', 'Antioxidant support'],
        type: 'drip',
    },
    {
        slug: 'detox-hangover',
        name: 'Detox & Hangover Recovery',
        tagline: 'Flush. Restore. Revive.',
        description: 'Flush toxins, rehydrate, and restore energy after stress, alcohol, travel, or intense workouts. Combats dehydration and reduces oxidative stress on the liver and cardiovascular system.',
        keyBenefits: ['Rapid rehydration', 'Liver detoxification support', 'Reduces hangover symptoms'],
        type: 'drip',
    },
    {
        slug: 'energy',
        name: 'Energy IV',
        tagline: 'Power Up. Feel Clear. Go.',
        description: 'Fast, clean energy to power through your day. Reduces inflammatory responses and combats fatigue by improving muscle recovery at a cellular level through anti-oxidation and serotonin support.',
        keyBenefits: ['Fast energy boost', 'Reduces fatigue & brain fog', 'Supports mood & nervous system'],
        type: 'drip',
    },
    {
        slug: 'fat-burner',
        name: 'Metabolism & Fat Burner',
        tagline: 'Burn. Energize. Transform.',
        description: 'Boost metabolism, burn fat, and power up your energy naturally. Essential amino acids and vitamins transport fatty acids into mitochondria where they are burned for energy.',
        keyBenefits: ['Boosts metabolism', 'Enhances fat breakdown', 'Mood improvement & appetite control'],
        type: 'drip',
    },
    {
        slug: 'myers-cocktail',
        name: 'Myers Cocktail',
        tagline: 'The Gold Standard of Wellness.',
        description: 'The most popular and in-demand IV infusion in the industry. A powerful blend of Vitamin C, B-Complex, Magnesium, and Calcium — known for delivering broad, noticeable results.',
        keyBenefits: ['Energy boost', 'Immune & stress support', 'Migraine & headache relief'],
        type: 'drip',
    },
    {
        slug: 'migraine',
        name: 'Migraine Relief',
        tagline: 'Fast Relief. Gentle Care.',
        description: 'Helps reduce pain, relax muscles, calm nausea, and rehydrate — often giving clients relief within 20–40 minutes. Improves vascular function linked to migraine attacks.',
        keyBenefits: ['Fast pain relief', 'Reduces nausea & light sensitivity', 'Restores hydration quickly'],
        type: 'drip',
    },
    {
        slug: 'prenatal',
        name: 'Prenatal Hydration',
        tagline: 'Gentle Support for Expecting Moms.',
        description: 'Designed to support pregnant clients experiencing nausea, dehydration, fatigue, or difficulty keeping fluids down. Supports methylation, reduces nausea, and provides folic acid. Consultation required.',
        keyBenefits: ['Hydration & nausea support', 'Electrolyte balance', 'Gentle & pregnancy-safe'],
        type: 'drip',
    },
    {
        slug: 'nr-infusion',
        name: 'NR IV Infusion',
        tagline: 'Cellular Energy. Longevity Support.',
        description: 'Nicotinamide Riboside (NR) is a direct precursor to NAD+, a critical coenzyme involved in cellular energy production, metabolism, and DNA repair — supporting healthy aging from the inside out.',
        keyBenefits: ['Supports NAD+ levels', 'Cellular energy & metabolism', 'Anti-aging & DNA repair support'],
        type: 'drip',
    },
];

const imInjections: ServiceCard[] = [
    {
        slug: 'b12-injection',
        name: 'Vitamin B12 Injection',
        tagline: 'Clean Energy. Lifted Mood. Clear Focus.',
        description: 'A powerful dose of Vitamin B12 to enhance energy, support metabolism, lift mood, improve focus, and strengthen immunity. The perfect weekly or biweekly injection for sustained wellness.',
        keyBenefits: ['Natural energy boost', 'Supports metabolism & weight management', 'Enhances mood & mental clarity'],
        type: 'injection',
    },
    {
        slug: 'b-complex-injection',
        name: 'Vitamin B-Complex Injection',
        tagline: 'Energize. Balance. Restore.',
        description: 'A blend of essential B vitamins (B1–B12) that together support energy, metabolism, brain function, immunity, and cellular repair — one of the most popular and foundational wellness injections.',
        keyBenefits: ['Boosts natural energy & stamina', 'Supports healthy metabolism', 'Strengthens immunity'],
        type: 'injection',
    },
    {
        slug: 'glutathione-injection',
        name: 'Glutathione Injection',
        tagline: 'The Master Antioxidant.',
        description: 'The body\'s master antioxidant. Brightens skin, supports liver detox, boosts immunity, and revives cellular energy. Supercharges any IV drip for deeper, more powerful results.',
        keyBenefits: ['Powerful cellular detox', 'Skin brightening & anti-aging', 'Immune support & liver health'],
        type: 'injection',
    },
];

function ServiceCard({ card }: { card: ServiceCard }) {
    return (
        <div className={styles.serviceCard}>
            <span className={styles.cardType}>{card.type === 'drip' ? 'IV Drip' : 'IM Injection'}</span>
            <h3 className={styles.cardTitle}>{card.name}</h3>
            <p className={styles.cardTagline}>{card.tagline}</p>
            <p className={styles.cardDescription}>{card.description}</p>
            <ul className={styles.cardBenefits}>
                {card.keyBenefits.map(b => <li key={b}>{b}</li>)}
            </ul>
            <div className={styles.cardActions}>
                <Button label="Learn More" href={`/services/iv-therapy/${card.slug}`} theme="primary" size={'large'} />
            </div>
        </div>
    );
}

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
                            <h1 className={styles.heroTitle}>IV Therapy &amp; Vitamin Injections</h1>
                            <p className={styles.heroText}>
                                Restore hydration, replenish nutrients, and support immune function with customized IV
                                infusions and vitamin injections — administered by a licensed provider and delivered
                                directly to you.
                            </p>
                            <div className={styles.heroActions}>
                                <Button
                                    label="Book a Treatment"
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

                <section id="overview" className={styles.introSection}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Why IV Therapy?</h2>
                        <div className={styles.introCopy}>
                            <p>
                                Unlike oral supplements, IV therapy delivers nutrients directly into your bloodstream —
                                bypassing the digestive system for immediate, 100% absorption. Clients often feel results
                                within 20–40 minutes.
                            </p>
                            <p>
                                Whether you're recovering from a workout, battling fatigue, seeking a beauty boost, or
                                looking to support your immune system, The Road to Zero offers a full menu of customized
                                infusions and injections tailored to your wellness goals.
                            </p>
                            <p>
                                All treatments are administered by or under the supervision of a licensed medical
                                provider in accordance with Utah state regulations. We come to you — at home, your
                                office, a wellness studio, or special event.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="iv-infusions" className={styles.servicesSection}>
                    <div className={styles.wide}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>IV Infusions</h2>
                            <p className={styles.sectionSubtext}>
                                Customized drips for hydration, recovery, beauty, and wellness — delivered in 30–60 minutes.
                            </p>
                        </div>
                        <div className={styles.servicesGrid}>
                            {ivDrips.map(card => <ServiceCard key={card.slug} card={card} />)}
                        </div>
                    </div>
                </section>

                <section id="im-injections" className={styles.servicesSectionAlt}>
                    <div className={styles.wide}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>IM Injections</h2>
                            <p className={styles.sectionSubtext}>
                                Quick, powerful intramuscular injections — perfect as stand-alone treatments or paired with any IV drip.
                            </p>
                        </div>
                        <div className={styles.injectionsGrid}>
                            {imInjections.map(card => <ServiceCard key={card.slug} card={card} />)}
                        </div>
                    </div>
                </section>

                <section id="add-ons" className={styles.addOnsSection}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitleCentered}>Customize Your Drip</h2>
                        <p className={styles.centeredText}>
                            Every treatment can be personalized with add-ons to target your specific needs.
                            Common add-ons include:
                        </p>
                        <div className={styles.addOnsGrid}>
                            {[
                                { name: 'Glutathione', desc: 'Master antioxidant for detox, skin brightening & immune support' },
                                { name: 'B12 Boost', desc: 'Clean, sustained energy and immune resilience' },
                                { name: 'Extra Vitamin C', desc: 'Enhanced immune cell function, collagen & tissue repair' },
                                { name: 'Amino Blend', desc: 'Muscle recovery, endurance & protein synthesis support' },
                                { name: 'Mineral Blend', desc: 'Magnesium, zinc, copper & manganese for cellular function' },
                                { name: 'Taurine', desc: 'Cardiovascular and nervous system support' },
                            ].map(addon => (
                                <div key={addon.name} className={styles.addOnCard}>
                                    <h4>{addon.name}</h4>
                                    <p>{addon.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="book" className={styles.ctaSection}>
                    <div className={styles.ctaCard}>
                        <h2>Ready to Restore Your Balance?</h2>
                        <p>Book your IV therapy session today. We come to you — home, office, event, or wellness studio.</p>
                        <div className={styles.ctaActions}>
                            <Button
                                label="Book a Treatment"
                                href="https://booking.hydreight.com/widget-business/fk58k"
                                theme="primary"
                            />
                            <Button
                                label="Back to All Services"
                                href="/services"
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
