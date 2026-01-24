import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <Outlet />
        </div>
    )
}
