import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Immune Boost',
    tagline: 'Defend. Recover. Thrive.',
    heroText: 'Strengthen your body\'s natural defenses, fight off infections faster, and stay at your best — especially popular during cold & flu season, travel, or periods of high stress.',
    description: [
        'The Immune Boost IV delivers a powerful combination of hydration, immune-supporting vitamins, and antioxidants directly into the bloodstream for faster, more effective absorption than oral supplements.',
        'It helps replenish depleted nutrients, reduce fatigue, and support the body\'s ability to respond to stress and illness. Whether you\'re already feeling run-down or trying to stay ahead of seasonal illness, this drip gives your immune system the tools it needs.',
        'Especially popular during cold and flu season, before and after travel, or during periods of high physical or emotional stress — the Immune IV is ideal for clients who want to stay healthy, recover faster, and maintain peak wellness year-round.',
    ],
    addOns: [
        { name: 'Glutathione', detail: 'The master antioxidant — supercharges immune defense, supports detoxification, and reduces oxidative stress.' },
        { name: 'Vitamin B12', detail: 'Boosts energy and supports red blood cell production. Ideal for clients feeling run-down or exhausted.' },
        { name: 'Extra Vitamin C', detail: 'Enhances immune cell function, supports collagen and tissue repair, and amplifies antioxidant protection.' },
        { name: 'Zinc Booster', detail: 'Strengthens the body\'s first line of immune defense. Helps shorten duration of colds and viral symptoms.' },
        { name: 'Extra Fluids', detail: 'Improves hydration, helps flush toxins, and supports circulation and overall recovery.' },
        { name: 'Magnesium', detail: 'Calms the body, reduces stress and muscle tension, and supports sleep and nervous system balance.' },
    ],
    benefits: [
        {
            title: 'Strengthens Immunity',
            description: 'High-dose Vitamin C, Zinc, and B vitamins help boost the immune system and support white blood cell function.',
        },
        {
            title: 'Faster Recovery',
            description: 'Helps reduce the severity and duration of illness. Ideal for clients feeling run-down, fatigued, or recently exposed.',
        },
        {
            title: 'Rehydrates & Replenishes',
            description: 'IV fluids restore electrolytes and hydration lost from illness or stress, preventing dehydration-related fatigue.',
        },
        {
            title: 'Reduces Stress & Fatigue',
            description: 'B-Complex vitamins support nervous system function, helping clients feel more energized and resilient.',
        },
        {
            title: 'Antioxidant Support',
            description: 'Glutathione and Vitamin C neutralize free radicals and oxidative stress, protecting cells and promoting cellular health.',
        },
        {
            title: 'Pre-Travel or Event Boost',
            description: 'Strengthens immunity before flights, vacations, or large gatherings — helping prevent getting sick during high-risk periods.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
