import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Beauty & Youth',
    tagline: 'Hydrate. Rejuvenate. Shine.',
    heroText: 'Your ultimate beauty boost from the inside out. Supports glowing skin, stronger hair and nails, and cellular anti-aging — so the glow you feel is the youth you see.',
    description: [
        'The Beauty & Youth IV Drip is designed to support radiant skin, hair, and nails while promoting cellular health, anti-aging, and overall vitality from the inside out.',
        'This infusion provides essential nutrients, antioxidants, and vitamins that support hormone pathways, reduce oxidative stress, and nourish the body to produce fatty acids that prevent premature and visible skin aging.',
        'Popular before weddings, photoshoots, vacations, or as an ongoing beauty maintenance treatment, clients notice a visible radiance boost alongside lasting improvements in skin texture, clarity, and overall glow.',
    ],
    addOns: [
        { name: 'Biotin', detail: 'Supports healthy hair growth, stronger nails, and skin health. A cornerstone beauty vitamin.' },
        { name: 'Glutathione', detail: 'The master antioxidant — brightens skin tone, reduces hyperpigmentation, and supports collagen production.' },
        { name: 'B-Complex (BPlex)', detail: 'B vitamins support cellular turnover, circulation, and overall skin vitality.' },
        { name: 'Mineral Blend', detail: 'Magnesium, Zinc, Manganese, and Copper — essential trace minerals for skin repair and cellular function.' },
    ],
    benefits: [
        {
            title: 'Radiant, Glowing Skin',
            description: 'Glutathione, Vitamin C, and Biotin help reduce oxidative stress, brighten skin tone, and support collagen production for youthful, supple skin.',
        },
        {
            title: 'Stronger Hair & Nails',
            description: 'Biotin, B vitamins, and trace minerals promote healthy hair growth and stronger nails, and help repair damage from stress or environmental factors.',
        },
        {
            title: 'Anti-Aging & Cellular Support',
            description: 'Antioxidants like Glutathione and Vitamin C combat free radical damage and support healthy aging at the cellular level.',
        },
        {
            title: 'Deep Skin Hydration',
            description: 'IV fluids restore hydration, plumping the skin and reducing dryness, dullness, and loss of elasticity.',
        },
        {
            title: 'Boosts Energy & Overall Wellness',
            description: 'B-Complex and B12 support energy, mental clarity, and stress resilience so you feel as good as you look.',
        },
        {
            title: 'Pre-Event Glow',
            description: 'Popular before weddings, vacations, and photoshoots. Clients love the immediate radiance boost that lasts for days.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
