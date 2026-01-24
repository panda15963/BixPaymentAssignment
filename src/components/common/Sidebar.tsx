import { NavLink } from 'react-router-dom'
import { navigation } from '../sidebar/navigation'

export default function Sidebar() {
    return (
        <aside className="hidden lg:fixed lg:top-16 lg:bottom-12 z-10 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white px-6">
                <nav className="flex flex-1 flex-col gap-y-1">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) =>
                                `group flex gap-x-3 rounded-md p-2 text-sm font-semibold
                ${
                                    isActive
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                                }`
                            }
                        >
                            <item.icon className="size-6 shrink-0" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </aside>
    )
}