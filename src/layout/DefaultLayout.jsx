import { Outlet } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            {/* Il min-height tiene il footer lontano dall'header anche se i dati non ci sono ancora */}
            <main style={{ flexGrow: 1, minHeight: '600px' }}> 
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}