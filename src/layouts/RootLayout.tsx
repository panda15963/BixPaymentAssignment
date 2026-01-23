import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex flex-1 items-center justify-center px-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}