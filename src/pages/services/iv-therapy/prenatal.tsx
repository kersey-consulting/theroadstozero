import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css';
import {ServicePageLayout} from "@/components/ServicePageLayout";
import type {ServicePageData} from "@/components/ServicePageLayout";

const data: ServicePageData = {
    type: 'IV Drip',
    name: 'Prenatal Hydration',
    tagline: 'Gentle Support for Expecting Moms.',
    heroText: 'Designed to support pregnant clients experiencing nausea, dehydration, fatigue, or difficulty keeping fluids down — safe, gentle, and provider-guided from start to finish.',
    description: [
        'This vitamin combination supports methylation — a key process for a healthy pregnancy — while also improving nausea and providing folic acid to reduce structural abnormalities. It is specially formulated to be safe for pregnant clients when administered under medical supervision.',
        'Pregnant women commonly experience dehydration due to first-trimester nausea, food aversions, low appetite, and the increased fluid demands of a growing pregnancy. IV therapy bypasses the digestive system entirely, providing immediate absorption without worsening nausea.',
        'As a Registered Nurse and Midwife, Rachel brings exceptional clinical expertise and compassion to prenatal IV therapy. A consultation is required, and all treatments are tailored to the individual client\'s needs and provider guidance.',
    ],
    addOns: [
        { name: 'B-Complex (BPlex)', detail: 'B1 through B6 for energy support and nausea reduction. Consultation required before adding to prenatal drips.' },
        { name: 'Ondansetron (Zofran)', detail: 'Provider-prescribed anti-nausea medication for severe nausea. Requires a note from your OB/GYN and a full consultation.' },
    ],
    requiresConsultation: true,
    benefits: [
        {
            title: 'Hydration Support',
            description: 'Restores fluids quickly and safely — addressing dehydration from nausea, vomiting, food aversions, and increased fluid needs during pregnancy.',
        },
        {
            title: 'Nausea Relief',
            description: 'Provider-guided add-ons can address nausea and vomiting, making it easier to eat, hydrate, and feel more comfortable.',
        },
        {
            title: 'Electrolyte Balance',
            description: 'Pregnancy increases the body\'s need for magnesium, potassium, calcium, and sodium. Balanced electrolytes improve energy, muscle function, and overall comfort.',
        },
        {
            title: 'Increased Energy',
            description: 'Pregnancy-related fatigue is extremely common. Rehydration combined with provider-approved B vitamins supports cellular energy and mental clarity.',
        },
        {
            title: 'Headache Relief',
            description: 'Dehydration and pregnancy hormones often trigger headaches. IV fluids and electrolytes help reduce headache intensity and restore overall well-being.',
        },
        {
            title: 'Gentle on the Stomach',
            description: 'IV therapy bypasses the digestive system entirely, providing relief without worsening nausea — ideal when oral supplements aren\'t tolerated.',
        },
    ],
};

export function App() {
    return <ServicePageLayout data={data} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
