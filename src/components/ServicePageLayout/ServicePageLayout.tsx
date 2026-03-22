import {Header} from "../Navigation/Header/Header";
import {Footer} from "../Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";
import styles from './ServicePageLayout.module.css';

export type Benefit = {
    title: string;
    description: string;
};

export type AddOn = {
    name: string;
    detail: string;
};

export type ServicePageData = {
    type: 'IV Drip' | 'IM Injection';
    name: string;
    tagline: string;
    heroText: string;
    description: string[];
    benefits: Benefit[];
    addOns?: AddOn[];
    pairWith?: string[];
    requiresConsultation?: boolean;
};

type Props = {
    data: ServicePageData;
};

export function ServicePageLayout({ data }: Props) {
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
                            <div className={styles.breadcrumb}>
                                <a href="/services/iv-therapy">← IV Therapy & Vitamin Injections</a>
                            </div>
                            <span className={styles.typeTag}>{data.type}</span>
                            <h1 className={styles.heroTitle}>{data.name}</h1>
                            <p className={styles.heroTagline}>{data.tagline}</p>
                            <p className={styles.heroText}>{data.heroText}</p>
                            <div className={styles.heroActions}>
                                <Button
                                    label="Book This Treatment"
                                    href="https://booking.hydreight.com/widget-business/fk58k"
                                    theme="primary"
                                />
                                <Button
                                    label="View All IV Services"
                                    href="/services/iv-therapy"
                                    theme="primary"
                                />
                            </div>
                        </div>
                    }
                />

                <section className={styles.descriptionSection}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>About This Treatment</h2>
                        <div className={styles.copy}>
                            {data.description.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                        {data.requiresConsultation && (
                            <div className={styles.consultationNote}>
                                A consultation is required prior to this treatment. Please contact us to schedule.
                            </div>
                        )}
                    </div>
                </section>

                <section className={styles.benefitsSection}>
                    <div className={styles.narrow}>
                        <h2 className={styles.sectionTitle}>Key Benefits</h2>
                        <div className={styles.benefitsGrid}>
                            {data.benefits.map((benefit, i) => (
                                <div key={i} className={styles.benefitCard}>
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {data.addOns && data.addOns.length > 0 && (
                    <section className={styles.addOnsSection}>
                        <div className={styles.narrow}>
                            <h2 className={styles.sectionTitle}>Available Add-Ons</h2>
                            <p className={styles.addOnsIntro}>
                                Customize your treatment with targeted add-ons for deeper, more personalized results.
                            </p>
                            <div className={styles.addOnsGrid}>
                                {data.addOns.map((addon, i) => (
                                    <div key={i} className={styles.addOnCard}>
                                        <h4>{addon.name}</h4>
                                        <p>{addon.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {data.pairWith && data.pairWith.length > 0 && (
                    <section className={styles.pairSection}>
                        <div className={styles.narrow}>
                            <h2 className={styles.sectionTitleCentered}>Pairs Well With</h2>
                            <p className={styles.centeredText}>Enhance your results by combining this treatment with:</p>
                            <div className={styles.pairTags}>
                                {data.pairWith.map((service, i) => (
                                    <span key={i} className={styles.pairTag}>{service}</span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className={styles.ctaSection}>
                    <div className={styles.ctaCard}>
                        <h2>Ready to Begin?</h2>
                        <p>Book your {data.name} session today. We come to you — home, office, or wellness studio.</p>
                        <div className={styles.ctaActions}>
                            <Button
                                label="Book This Treatment"
                                href="https://booking.hydreight.com/widget-business/fk58k"
                                theme="primary"
                            />
                            <Button
                                label="View All IV Services"
                                href="/services/iv-therapy"
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
