import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Athlete Recovery',
    tagline: 'Replenish. Restore. Perform.',
    heroText: 'Accelerate recovery and feel stronger for every workout. Designed to rehydrate, replenish nutrients, reduce muscle soreness, and get you back to peak performance faster.',
    description: [
        'The Athlete Recovery IV is designed for athletes, fitness enthusiasts, and active clients who want to feel their best faster after intense training, workouts, or competitions.',
        'Amino acids and B12 help with muscle conditioning, recovery, and endurance. This blend also assists the nervous system, metabolism, and protein synthesis — giving your body the tools it needs to rebuild and perform.',
        'Whether you\'re training for a race, recovering from competition, or simply pushing your limits in the gym, this infusion delivers the nutrients your body needs directly to the bloodstream for maximum absorption.',
    ],
    addOns: [
        { name: 'Vitamin B12', detail: 'Supports energy, metabolism, and red blood cell production. Often felt within 24–48 hours.' },
        { name: 'Amino Blend', detail: 'Ornithine 50mg, Arginine 100mg, Lysine 50mg, Citrulline 50mg — supports muscle recovery and protein synthesis.' },
        { name: 'B-Complex (BPlex)', detail: 'B1, B2, B3, B5, B6 blend supporting energy metabolism, nerve function, and endurance.' },
        { name: 'Glutathione', detail: 'The master antioxidant — reduces oxidative stress from intense training and supports cellular recovery.' },
        { name: 'Taurine', detail: 'Supports cardiovascular function, muscle performance, and nervous system health.' },
    ],
    pairWith: ['Energy IV', 'Fat Burner IV', 'Myers Cocktail', 'B12 Injection'],
    benefits: [
        {
            title: 'Rapid Rehydration',
            description: 'IV fluids quickly restore lost water and electrolytes, helping prevent cramping, fatigue, and dizziness after exercise.',
        },
        {
            title: 'Replenishes Essential Nutrients',
            description: 'B-Complex, B12, magnesium, and amino acids restore vitamins and minerals depleted during workouts.',
        },
        {
            title: 'Reduces Muscle Soreness & Cramps',
            description: 'Magnesium and amino acids help relax muscles and reduce post-workout pain, supporting faster recovery between sessions.',
        },
        {
            title: 'Boosts Energy & Mental Focus',
            description: 'B12 and B-complex help clients feel alert, focused, and energized — improving performance in subsequent sessions.',
        },
        {
            title: 'Supports Immune & Cellular Health',
            description: 'Antioxidants like Vitamin C and Glutathione reduce oxidative stress from intense training and help prevent illness.',
        },
        {
            title: 'Prepares the Body for Peak Performance',
            description: 'Helps athletes feel stronger, faster, and more resilient — ready for whatever comes next.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
