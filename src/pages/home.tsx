import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {Header} from "../components/Navigation/Header/Header";
import {Footer} from "../components/Navigation/Footer/Footer";

export function App() {
    return <div>
        <Header />
        <div>
            <span>
                Welcome to My Website!
            </span>
        </div>
        <Footer />
    </div>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
