import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Migraine Relief',
    tagline: 'Fast Relief. Gentle Care.',
    heroText: 'Helps reduce pain, relax muscles, calm nausea, and rehydrate — often giving clients meaningful relief within 20–40 minutes. Don\'t lose a day to migraine pain.',
    description: [
        'The Migraine Relief IV is a multifaceted infusion designed to improve vascular function linked to migraine attacks, reduce nausea, and restore hydration — addressing multiple triggers and symptoms at once.',
        'Even mild dehydration can trigger migraines. Combined with magnesium deficiency and nervous system dysregulation, migraines can be debilitating. This infusion works on all three pathways simultaneously.',
        'This treatment is ideal for clients who experience frequent migraines, tension headaches, menstrual-related head pain, or stress-triggered migraines and want fast, effective relief without waiting for oral medications to kick in.',
    ],
    addOns: [
        { name: 'B-Complex (BPlex)', detail: 'B1 through B6 to support nervous system function and help regulate the brain pathways involved in migraine activity.' },
        { name: 'Glutamine', detail: 'Supports gut health and tissue repair. Beneficial for clients whose migraines are triggered by gut inflammation.' },
        { name: 'Acetaminophen (oral)', detail: '1000mg oral acetaminophen for additional pain relief alongside the IV infusion.' },
        { name: 'Glutathione', detail: 'Anti-inflammatory and detox support to reduce oxidative stress that can contribute to migraine severity.' },
        { name: 'Extra Fluids', detail: 'Additional IV fluids for deeper hydration — especially helpful for clients with severe dehydration.' },
        { name: 'Magnesium Booster', detail: 'Extra magnesium specifically for tension headaches, menstrual migraines, and muscle-related head pain.' },
    ],
    benefits: [
        {
            title: 'Fast Relief',
            description: 'Helps calm headache intensity, muscle tightness, and throbbing pain — often within 20–40 minutes of starting the infusion.',
        },
        {
            title: 'Reduces Nausea & Sensitivity',
            description: 'Addresses nausea while hydration eases dizziness, light sensitivity, and the disorientation that accompanies severe migraines.',
        },
        {
            title: 'Relaxes Muscles & Eases Tension',
            description: 'Magnesium works directly on tension headaches, menstrual-related migraines, and stress-triggered muscle tightness.',
        },
        {
            title: 'Restores Hydration',
            description: 'Even mild dehydration can trigger or worsen migraines. IV fluids provide immediate, effective replenishment.',
        },
        {
            title: 'Calms the Nervous System',
            description: 'B vitamins and magnesium help regulate the brain pathways involved in migraine activity and nerve sensitivity.',
        },
        {
            title: 'Gets You Back to Your Day',
            description: 'Perfect for clients who cannot afford to lose a day to pain. Many clients return to normal activity within hours.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
