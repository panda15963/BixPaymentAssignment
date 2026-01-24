import Sidebar from '../components/common/Sidebar'
import MobileSidebar from '../components/sidebar/MobileSidebar'
import {Outlet} from "react-router-dom";
import {useState} from "react";

export default function PostLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <MobileSidebar open={sidebarOpen} onClose={setSidebarOpen} />
            <Sidebar />

            <div className="lg:pl-72">
                {/* header */}
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}