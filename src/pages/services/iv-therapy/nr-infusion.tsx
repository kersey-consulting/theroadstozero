import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'NR IV Infusion',
    tagline: 'Cellular Energy. Longevity Support.',
    heroText: 'Nicotinamide Riboside (NR) is a direct NAD+ precursor — supporting cellular energy production, metabolism, and DNA repair at the deepest level. Anti-aging from the inside out.',
    description: [
        'Nicotinamide Riboside (NR) is a form of Vitamin B3 and a direct precursor to NAD+, a critical coenzyme involved in cellular energy production, metabolism, and DNA repair. NAD+ levels naturally decline with age, stress, and chronic fatigue — and NR helps the body naturally restore them.',
        'NAD+ is found in every cell of the body and is essential for the function of mitochondria (the cell\'s energy factories), DNA repair enzymes, and sirtuins — proteins associated with healthy aging and longevity. When NAD+ levels decline, cellular energy, recovery, and resilience all suffer.',
        'The NR IV Infusion delivers Nicotinamide Riboside directly to the bloodstream for maximum bioavailability — supporting energy, mental clarity, recovery, and healthy aging in ways that oral supplements cannot match.',
    ],
    benefits: [
        {
            title: 'Supports NAD+ Levels',
            description: 'NR is one of the most efficient NAD+ precursors. IV delivery maximizes absorption and raises NAD+ levels faster than oral supplementation.',
        },
        {
            title: 'Cellular Energy Production',
            description: 'NAD+ is essential to mitochondrial function — the process by which your cells convert nutrients into usable energy. Higher NAD+ means more cellular vitality.',
        },
        {
            title: 'DNA Repair Support',
            description: 'NAD+ activates DNA repair enzymes (PARPs) that help the body identify and correct cellular damage — supporting healthy aging and reduced cellular stress.',
        },
        {
            title: 'Mental Clarity & Focus',
            description: 'Many clients report improved cognitive function, sharper focus, and mental clarity following NR infusions — particularly those experiencing brain fog or cognitive fatigue.',
        },
        {
            title: 'Improved Recovery',
            description: 'Enhanced cellular repair and energy production translates to faster recovery from exercise, illness, and the demands of daily life.',
        },
        {
            title: 'Longevity & Anti-Aging',
            description: 'Supporting NAD+ levels is one of the most researched areas of longevity science. NR therapy may support healthy aging at the foundational, cellular level.',
        },
    ],
    pairWith: ['Myers Cocktail', 'Glutathione Injection', 'B12 Injection', 'Athlete Recovery IV'],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
