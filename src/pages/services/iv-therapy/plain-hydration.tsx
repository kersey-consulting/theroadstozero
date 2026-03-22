import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Plain Hydration',
    tagline: 'Restore. Replenish. Rebalance.',
    heroText: 'A pure Lactated Ringer solution to rapidly restore hydration and replenish essential electrolytes. Gentle, effective, and fast-acting — the perfect foundation for recovery and wellness.',
    description: [
        'Lactated Ringer (LR) is a balanced electrolyte solution commonly used to restore hydration and replenish essential minerals. It contains sodium, potassium, calcium, and chloride in proportions close to the body\'s own fluid composition.',
        'This treatment is designed to flush toxins, rehydrate the body, and restore energy after stress, alcohol, travel, or intense workouts. It is one of the most popular mobile IV hydration options because clients feel noticeable results quickly.',
        'Plain Hydration serves as an excellent stand-alone drip or as the base solution for custom IV therapy with added vitamins, amino acids, or minerals tailored to your unique wellness goals.',
    ],
    benefits: [
        {
            title: 'Rapid Hydration',
            description: 'Quickly restores fluids for clients experiencing dehydration due to exercise, illness, heat exposure, or travel and jet lag.',
        },
        {
            title: 'Replenishes Electrolytes',
            description: 'Contains sodium, potassium, calcium, and chloride — helping prevent muscle cramps, fatigue, dizziness, and dehydration-related headaches.',
        },
        {
            title: 'Supports Muscle & Nerve Function',
            description: 'Essential electrolytes improve muscle contraction, nerve signaling, and overall energy throughout the body.',
        },
        {
            title: 'Safe & Gentle',
            description: 'Ideal for clients who need hydration without extra vitamins or additives. Well-tolerated and fast-acting for nearly all individuals.',
        },
        {
            title: 'Recovery Support',
            description: 'Helps clients feel better faster after illness, alcohol intake, or long workouts. Can serve as the base for customized drips.',
        },
        {
            title: 'Pre/Post Event Hydration',
            description: 'Popular before or after long flights, events, or sports activities. Helps prevent fatigue, dehydration, and electrolyte imbalances.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
