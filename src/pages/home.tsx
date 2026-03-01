import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import '@/index.css'
import {Header} from "../components/Navigation/Header/Header";
import {Footer} from "../components/Navigation/Footer/Footer";
import {Hero} from "@/components/Hero";
import {Button} from "@/components/Button";

export function App() {
    return <div>
        <Header/>
        <main id={'main'}>
            <Hero
                backgroundImage={'/assets/Sand.jpeg'}
                theme={'tertiary'}
                left={
                    <div>
                        <h1>The Road to Zero</h1>
                        <h2>Medical Wellness, IV Therapy & Aesthetics</h2>
                        <p>RN-led wellness and aesthetic services designed to support balance, recovery, vitality, and natural confidence. We offer personalized, science-backed treatments in a calm, intentional setting, focused on helping you feel and look your best from the inside out.</p>
                        <Button label={'Book a Consultation'} theme={'primary'} size={'large'}/>
                        <Button label={'Explore Our Services'} href={'/services'} theme={'secondary'} size={'large'}/>
                    </div>
                }
                right={<p></p>}
            />
            <div style={{maxWidth: '900px', margin: '0 auto'}}>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                    pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
                    diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                    malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
                    litora torquent per conubia nostra inceptos himenaeos.
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                    pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
                    diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                    malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
                    litora torquent per conubia nostra inceptos himenaeos.
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                    pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
                    diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                    malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
                    litora torquent per conubia nostra inceptos himenaeos.
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                    pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
                    diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                    malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
                    litora torquent per conubia nostra inceptos himenaeos.
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                    pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
                    diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                    malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
                    litora torquent per conubia nostra inceptos himenaeos.
                </div>
            </div>
        </main>
        <Footer/>
    </div>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
