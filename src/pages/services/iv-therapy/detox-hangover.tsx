import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Detox & Hangover Recovery',
    tagline: 'Flush. Restore. Revive.',
    heroText: 'Rehydrate, detoxify, and recover in one revitalizing drip. Designed to flush toxins, restore essential nutrients, and get you feeling like yourself again — fast.',
    description: [
        'The Detox & Hangover Recovery IV contains essential vitamins and minerals to combat dehydration and reduce oxidative stress on the liver, cardiovascular, and endocrine systems by assisting in detoxification of the body.',
        'This formula also reduces nausea, which is particularly helpful during recovery from alcohol, illness, or travel. Clients feel noticeable results quickly — making this one of the most popular mobile IV therapy options.',
        'Whether you\'re recovering from a night out, a long trip, an illness, or simply feeling toxic and depleted, this drip helps your body reset and return to balance.',
    ],
    addOns: [
        { name: 'Mineral Blend', detail: 'Magnesium, Zinc, Manganese, and Copper — essential for cellular detox and metabolic function.' },
        { name: 'Glutathione', detail: 'The master antioxidant — supports liver detoxification, neutralizes free radicals, and speeds recovery.' },
        { name: 'Glutamine', detail: 'Supports gut health and intestinal lining repair — beneficial after alcohol or inflammation.' },
        { name: 'B-Complex (BPlex)', detail: 'B1 through B6 to replenish B vitamins depleted by alcohol and support energy metabolism.' },
    ],
    benefits: [
        {
            title: 'Rapid Rehydration',
            description: 'Restores fluid balance after dehydration from alcohol, illness, travel, or exercise. Reduces fatigue, dizziness, and brain fog.',
        },
        {
            title: 'Detoxification Support',
            description: 'Glutathione, Vitamin C, and B vitamins help neutralize free radicals and support liver function and natural detox pathways.',
        },
        {
            title: 'Reduces Hangover Symptoms',
            description: 'Minimizes nausea, headaches, and body aches — significantly speeding up recovery after alcohol or social events.',
        },
        {
            title: 'Boosts Energy & Mental Clarity',
            description: 'B-Complex and B12 enhance energy production. Clients feel alert and refreshed within 30–60 minutes.',
        },
        {
            title: 'Muscle Recovery',
            description: 'Magnesium and amino acids reduce muscle cramps and soreness, supporting quicker recovery after physical activity.',
        },
        {
            title: 'Enhances Overall Wellness',
            description: 'Clients often report feeling lighter, more balanced, and less stressed — like a full system reset.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
