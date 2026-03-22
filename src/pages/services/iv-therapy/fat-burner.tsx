import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Metabolism & Fat Burner',
    tagline: 'Burn. Energize. Transform.',
    heroText: 'Boost metabolism, burn fat, and power up your energy naturally. Essential amino acids, vitamins, and B12 transport fatty acids into mitochondria where they can be burned for fuel.',
    description: [
        'The Metabolism & Fat Burner IV is the perfect blend of lipotropic compounds, B vitamins, and amino acids to transport fatty acids into mitochondria where they can be burned for energy. An extra benefit is mood improvement and additional appetite control.',
        'IV nutrients work faster and more effectively than oral supplements, making this an ideal support treatment alongside diet, exercise, and GLP-1 weight management programs.',
        'This drip is especially popular for clients who are working through weight-loss plateaus, wanting to boost their metabolism before a big event, or looking for complementary metabolic support alongside peptide or GLP-1 therapy.',
    ],
    addOns: [
        { name: 'MIC + B12', detail: 'Methionine 25mg, Inositol 50mg, Choline 50mg, B12 330mcg — core lipotropic compounds for fat mobilization and liver support.' },
        { name: 'Lipo Mino (without Carnitine)', detail: 'Pyridoxine, Methionine, Inositol, Choline, B12, Thiamine, Riboflavin — comprehensive fat metabolism support.' },
        { name: 'Lipo Stat Plus', detail: 'Methionine, Inositol, Choline, B6, Cyanocobalamin — targeted lipotropic and metabolic support.' },
        { name: 'Lipo Mino with Carnitine', detail: 'Full lipotropic blend with L-Carnitine for enhanced fat transport into mitochondria. Up to 6 weeks maximum.' },
    ],
    pairWith: ['Energy IV', 'Athlete Recovery IV', 'Medical Weight Management', 'Peptide & Hormone Support'],
    benefits: [
        {
            title: 'Boosts Metabolism',
            description: 'B12, B-Complex, Carnitine, and MIC help the body convert fat into usable energy and improve metabolic function.',
        },
        {
            title: 'Enhances Fat Breakdown',
            description: 'Carnitine and MIC assist with fat mobilization, helping the body burn stored fat more efficiently — especially alongside diet and exercise.',
        },
        {
            title: 'Increases Natural Energy',
            description: 'Because fat is used as fuel, clients experience steady energy, less fatigue, and reduced brain fog throughout the day.',
        },
        {
            title: 'Liver Detox & Hormone Balance',
            description: 'Choline and methionine help the liver process fats and toxins more effectively, supporting better digestion and overall wellness.',
        },
        {
            title: 'Enhances Workout Performance',
            description: 'A great option for gym clients, fitness programs, and athletes wanting more stamina and faster body composition changes.',
        },
        {
            title: 'Breaks Weight-Loss Plateaus',
            description: 'Perfect for clients struggling with low energy, slow metabolism, or difficulty staying motivated on their weight-loss journey.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
