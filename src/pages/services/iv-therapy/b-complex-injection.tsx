import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IM Injection',
    name: 'Vitamin B-Complex Injection',
    tagline: 'Energize. Balance. Restore.',
    heroText: 'A comprehensive blend of all essential B vitamins — supporting energy, metabolism, brain function, immunity, and cellular repair. One of the most foundational and widely requested wellness injections.',
    description: [
        'The Vitamin B-Complex Injection contains a blend of essential B vitamins (B1, B2, B3, B5, B6, B7, B9, and B12). Together they act as cofactors in metabolizing carbohydrates, fats, and proteins — making them essential for energy, cellular repair, and metabolic health.',
        'B vitamins support the immune system, red and white blood cell production, energy levels, cardiovascular health, inflammation response, and nervous system function. A deficiency in even one B vitamin can affect all the others.',
        'This injection is an excellent foundational add-on to virtually any IV drip, or can be offered as a quick stand-alone service. It is particularly popular for clients on weight management programs, athletes, and anyone dealing with burnout or mental fatigue.',
    ],
    pairWith: ['Myers Cocktail', 'Energy IV', 'Athlete Recovery IV', 'Detox & Hangover Recovery IV'],
    benefits: [
        {
            title: 'Boosts Natural Energy',
            description: 'Helps convert food into usable energy at the cellular level. Supports adrenal function and nervous system balance. Reduces fatigue without the crash.',
        },
        {
            title: 'Enhances Mood & Mental Clarity',
            description: 'Supports neurotransmitter production (serotonin and dopamine). Improves focus, concentration, and stress resilience for mentally drained clients.',
        },
        {
            title: 'Supports Healthy Metabolism',
            description: 'Essential for carbohydrate, protein, and fat metabolism. Assists weight-loss programs and metabolic balance — often paired with GLP-1 or lipotropic therapies.',
        },
        {
            title: 'Strengthens Immunity',
            description: 'B vitamins support cell repair and red blood cell production. Helps the body respond better to stress, illness, and inflammation.',
        },
        {
            title: 'Improves Skin, Hair & Nail Health',
            description: 'Supports cellular turnover and tissue repair. Enhances collagen production and circulation — great for beauty and overall vitality.',
        },
        {
            title: 'Supports Nervous System Health',
            description: 'Helps maintain healthy nerve function and reduces symptoms of stress-related tension, headaches, and irritability.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
