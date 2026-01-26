import { NavLink } from 'react-router-dom'
import type { ComponentType, SVGProps } from 'react'
import { useCategory } from '../../hooks/useCategory'

export type NavigationItem = {
    name: string
    to: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

type Props = {
    navigation?: NavigationItem[]
}

export default function Sidebar({
                                    navigation = [],
                                }: Readonly<Props>) {
    const currentCategory = useCategory()

    return (
        <aside className="hidden lg:fixed lg:top-16 lg:bottom-12 z-10 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white px-6">
                <nav className="flex flex-1 flex-col gap-y-1 py-5">
                    {navigation.length === 0 ? (
                        <p className="px-3 py-2 text-sm text-gray-400">
                            메뉴를 불러오는 중…
                        </p>
                    ) : (
                        navigation.map((item) => {
                            // 메뉴의 category 추출
                            const itemCategory =
                                new URLSearchParams(
                                    item.to.split('?')[1]
                                ).get('category')

                            const isActive =
                                currentCategory === itemCategory

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    className={() =>
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
                            )
                        })
                    )}
                </nav>
            </div>
        </aside>
    )
}