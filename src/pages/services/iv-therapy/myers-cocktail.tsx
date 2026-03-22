import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Myers Cocktail',
    tagline: 'The Gold Standard of IV Wellness.',
    heroText: 'The most popular and in-demand infusion in the industry. A powerful blend of Vitamin C, B-Complex, Magnesium, and Calcium delivering broad, noticeable results — the "gold standard" IV drip.',
    description: [
        'The Myers Cocktail is one of the most well-known and widely used IV formulas, celebrated for its broad range of benefits and reliable results. It contains Vitamin C, B-Complex, Magnesium, and Calcium, with optional additions of B12, Zinc, and Glutathione.',
        'This blend of B vitamins, Vitamin C, Magnesium, and Calcium work in combination to increase metabolism, replace electrolytes lost by dehydration, and facilitate enzymatic reactions in intracellular processes. This revitalizes the body, enhances relaxation, aids recovery, and supports cardiovascular wellness.',
        'Whether you\'re looking for energy, immune support, migraine relief, muscle recovery, or simply a comprehensive wellness reset — the Myers Cocktail is the go-to choice for clients at all stages of their health journey.',
    ],
    addOns: [
        { name: 'Glutathione', detail: 'The ultimate finishing touch — the master antioxidant for deeper detox, skin brightening, and cellular renewal.' },
        { name: 'B12 Boost', detail: 'Add extra B12 for enhanced energy, metabolism support, and immune resilience.' },
        { name: 'Zinc', detail: 'Strengthens immune response and supports wound healing and cellular repair.' },
    ],
    pairWith: ['Athlete Recovery IV', 'Immune Boost IV', 'Glutathione Injection', 'B12 Injection'],
    benefits: [
        {
            title: 'Energy Boost',
            description: 'The combination of B vitamins, Vitamin C, and minerals helps fight fatigue, burnout, and exhaustion — clients feel noticeably revitalized.',
        },
        {
            title: 'Immune Support',
            description: 'High-dose Vitamin C strengthens immune function and helps prevent or reduce the severity of illness.',
        },
        {
            title: 'Stress & Mood Support',
            description: 'Magnesium and B vitamins help regulate the nervous system, reducing stress, anxiety, and irritability.',
        },
        {
            title: 'Migraine & Headache Relief',
            description: 'The Myers is famous for relieving migraines, tension headaches, and muscle spasms. The magnesium and B-complex combination is clinically recognized.',
        },
        {
            title: 'Muscle Recovery & Performance',
            description: 'Athletes love the Myers for its support of electrolyte balance, muscle relaxation, and quicker post-workout recovery.',
        },
        {
            title: 'Overall Wellness & Balance',
            description: 'The perfect all-around drip for clients who want to feel better, stronger, and more mentally clear in every area of life.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
