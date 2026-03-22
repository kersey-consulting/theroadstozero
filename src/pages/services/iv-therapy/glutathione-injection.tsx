import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IM Injection',
    name: 'Glutathione Injection',
    tagline: 'The Master Antioxidant.',
    heroText: 'The body\'s most powerful antioxidant. Brightens skin, supports liver detox, boosts immunity, and revives cellular energy — supercharging every IV drip it accompanies.',
    description: [
        'Glutathione is known as the body\'s master antioxidant — a powerhouse molecule made of glutamine, cysteine, and glycine that is naturally produced in the liver. It plays a central role in detoxification, immune defense, and protecting cells from oxidative damage.',
        'As we age, stress accumulates, or toxin exposure increases, glutathione levels decline. This IM injection delivers a concentrated dose directly into the muscle for rapid, effective absorption — far superior to oral glutathione supplements, which break down in the digestive system.',
        'The Glutathione Injection is one of the most requested add-ons at The Road to Zero because it amplifies the benefits of nearly every other treatment — whether an IV drip, aesthetic procedure, or wellness program.',
    ],
    pairWith: ['Myers Cocktail', 'Beauty & Youth IV', 'Detox & Hangover Recovery IV', 'Immune Boost IV', 'NR IV Infusion'],
    benefits: [
        {
            title: 'Powerful Antioxidant & Cellular Detox',
            description: 'Neutralizes free radicals and oxidative stress. Supports liver detoxification pathways and protects cells from environmental toxins, chemicals, and pollution.',
        },
        {
            title: 'Skin Brightening & Anti-Aging',
            description: 'Reduces hyperpigmentation and dark spots. Promotes a more even, brighter skin tone by inhibiting melanin production and supporting collagen.',
        },
        {
            title: 'Immune Support',
            description: 'Strengthens immune-cell function and helps the body respond better to infections, inflammation, and stress.',
        },
        {
            title: 'Energy Boost & Mental Clarity',
            description: 'Supports mitochondrial function — the cell\'s energy factories. Many clients report feeling lighter, clearer, and less sluggish after treatment.',
        },
        {
            title: 'Liver Support & Post-Exposure Recovery',
            description: 'Helps break down and eliminate toxins and metabolic waste. Excellent after alcohol, medications, heavy workouts, or exposure to environmental stressors.',
        },
        {
            title: 'Amplifies IV Results',
            description: 'Glutathione pairs exceptionally well with Vitamin C, B-Complex, NAD+, Magnesium, and amino blends — making every drip work harder and deeper.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
