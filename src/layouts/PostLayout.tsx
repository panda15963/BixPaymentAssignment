import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/outline'

import Sidebar from '../components/common/Sidebar'
import MobileSidebar from '../components/sidebar/MobileSidebar'

import { getBoardCategories } from '../api/post'
import {
    buildNavigationFromCategories,
    type NavigationItem,
} from '../components/sidebar/navigation'

export default function PostLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [navigation, setNavigation] = useState<NavigationItem[]>([])

    const navigate = useNavigate()

    // ✅ PostLayout 마운트 시 단 1회만 실행
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getBoardCategories()
                const nav = buildNavigationFromCategories(categories)
                setNavigation(nav)

                // ✅ 최초 진입 시 category 없으면 첫 카테고리로 이동
                const hasCategory = new URLSearchParams(
                    window.location.search
                ).has('category')

                if (!hasCategory && nav.length > 0) {
                    navigate(nav[0].to, { replace: true })
                }
            } catch (e) {
                console.error('카테고리 로딩 실패', e)
            }
        }

        fetchCategories()
    }, []) // ✅ 의존성 배열 비움

    return (
        <>
            {/* 모바일 사이드바 */}
            <MobileSidebar
                open={sidebarOpen}
                onClose={setSidebarOpen}
                navigation={navigation}
            />

            {/* 데스크톱 사이드바 */}
            <Sidebar navigation={navigation} />

            <div className="lg:pl-72">
                {/* 모바일 헤더 */}
                <div className="lg:hidden p-4 border-b flex items-center">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                        aria-label="Open sidebar"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>

                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}