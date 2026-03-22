import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Energy IV',
    tagline: 'Power Up. Feel Clear. Go.',
    heroText: 'Fast, clean energy — no crash, no jitters. Your ultimate formula for hydration, vitamins, and cellular energy all in one drip, designed to help you power through your day.',
    description: [
        'The Energy IV combines amino acids, vitamins, and minerals to reduce inflammatory responses and combat fatigue by improving muscle recovery at a cellular level through anti-oxidation, serotonin production support, and cellular energy processes.',
        'Whether you\'re dealing with work-related burnout, post-travel exhaustion, chronic tiredness, or simply wanting more focus and drive, this drip delivers fast, clean energy that lasts.',
        'IV nutrients work faster and more effectively than oral supplements because they bypass the digestive system and enter the bloodstream immediately. Clients typically feel results within 20–40 minutes.',
    ],
    addOns: [
        { name: 'Mineral Blend', detail: 'Magnesium, Zinc, Copper, and Manganese to support cellular energy and nervous system function.' },
        { name: 'MIC + B12', detail: 'Methionine, Inositol, Choline, and B12 — supports fat metabolism, liver health, and sustained energy.' },
        { name: 'Lipo Mino', detail: 'Lipotropic vitamins with B12 to enhance fat burning, energy, and metabolic support.' },
        { name: 'Amino Blend', detail: 'Glutamine, Ornithine, Arginine, Lysine, and Citrulline — supports muscle recovery and sustained energy production.' },
    ],
    pairWith: ['Athlete Recovery IV', 'Myers Cocktail', 'B12 Injection', 'B-Complex Injection'],
    benefits: [
        {
            title: 'Fast Energy Boost',
            description: 'Replenishes essential vitamins and minerals that support cellular energy production. Clients feel alert and ready within 20–40 minutes.',
        },
        {
            title: 'Reduces Fatigue',
            description: 'Ideal for clients experiencing work-related burnout, chronic tiredness, or jet lag. Restores both mental and physical energy.',
        },
        {
            title: 'Supports Nervous System & Mood',
            description: 'B-Complex and B12 help regulate neurotransmitters, improving focus and reducing stress. Magnesium relaxes muscles and calms tension.',
        },
        {
            title: 'Enhances Athletic Performance',
            description: 'Amino acids and electrolytes help muscles recover after workouts and boost stamina and endurance for active clients.',
        },
        {
            title: 'Hydration + Vital Nutrients',
            description: 'IV fluids restore fluids and electrolytes faster than oral hydration, combating mild dehydration that can cause low energy or brain fog.',
        },
        {
            title: 'Safe, Quick & Convenient',
            description: 'Works in 20–40 minutes with minimal downtime. Perfect for busy clients who need results fast.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
