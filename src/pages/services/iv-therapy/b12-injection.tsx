import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IM Injection',
    name: 'Vitamin B12 Injection',
    tagline: 'Clean Energy. Lifted Mood. Clear Focus.',
    heroText: 'A powerful dose of Vitamin B12 to enhance energy, support metabolism, lift mood, improve focus, and strengthen immunity. The ideal weekly or biweekly injection for sustained wellness.',
    description: [
        'Vitamin B12 Intramuscular Injection (methylcobalamin or cyanocobalamin) is one of the most requested and impactful wellness add-ons available. It supports energy, metabolism, brain function, and red blood cell production — and clients often feel results within 24–48 hours.',
        'B12 is an essential nutrient that many people are deficient in — particularly those following plant-based diets, individuals over 50, or anyone with digestive issues affecting nutrient absorption. IM injection bypasses the digestive system entirely for full, immediate absorption.',
        'This injection can be offered as a stand-alone service in just 2–5 minutes, or paired with any IV drip for amplified results. It is a popular weekly or biweekly add-on for clients on weight management, energy optimization, or general wellness programs.',
    ],
    pairWith: ['Myers Cocktail', 'Energy IV', 'Athlete Recovery IV', 'Metabolism & Fat Burner IV'],
    benefits: [
        {
            title: 'Natural Energy Boost',
            description: 'B12 helps convert food into usable energy and supports adrenal function. Clients often feel a noticeable boost in energy within 24–48 hours.',
        },
        {
            title: 'Supports Metabolism & Weight Management',
            description: 'Helps the body metabolize fats and carbohydrates. Often used alongside GLP-1 programs and lipotropic injections for enhanced metabolic results.',
        },
        {
            title: 'Enhances Mood & Mental Clarity',
            description: 'Supports neurotransmitter balance (serotonin and dopamine). Helps improve focus, productivity, and mental fog — great for stressed or overworked clients.',
        },
        {
            title: 'Improves Sleep Regulation',
            description: 'B12 plays a role in melatonin production. Clients who struggle with sleep cycles may experience more balanced, restful sleep.',
        },
        {
            title: 'Red Blood Cell Production',
            description: 'Essential for oxygen transport and overall vitality. Helps prevent fatigue and weakness related to low B12 or mild anemia.',
        },
        {
            title: 'Boosts Immune Function',
            description: 'Helps maintain healthy nerve cells and immune responses — especially useful during cold/flu season, travel, or periods of high stress.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
