import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import HeaderLogo from '../header/HeaderLogo'; // 같은 header 폴더 가정, ../ 제거
import HeaderNavDesktop from '../header/HeaderNavDesktop';
import HeaderProfile from '../header/HeaderProfile';
import HeaderNavMobile from '../header/HeaderNavMobile';
import { navItems } from '../header/types';
import { useNavStore } from '../../stores/useNavStore'; // stores 경로 확인

export default function Header() {
    const { isMobileOpen, toggleMobile } = useNavStore();

    const handleNavClick = () => {
        toggleMobile(); // 네비 클릭 시 메뉴 자동 닫기
    };

    return (
        <div className="relative bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 justify-between">
                    {/* Mobile toggle */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={toggleMobile}
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-600 focus:outline-none focus:ring-inset dark:hover:bg-white/5 dark:hover:text-white dark:focus:ring-white"
                            aria-expanded={isMobileOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="absolute -inset-0.5 rounded border border-transparent group-hover:border-gray-300 dark:group-hover:border-white/20" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className={`block size-6 transition-opacity ${!isMobileOpen ? 'opacity-100' : 'opacity-0'}`}
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className={`size-6 transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </button>
                    </div>

                    {/* Logo & Desktop Nav */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <HeaderLogo />
                        <div className="ml-6 hidden sm:ml-6 sm:flex sm:space-x-8">
                            <HeaderNavDesktop items={navItems} />
                        </div>
                    </div>
                    <div className="flex items-center px-2 sm:px-0 sm:ml-6"> {/* px-2 모바일 여백, items-center */}
                        <HeaderProfile />
                    </div>
                </div>

                {/* Mobile menu - 올바른 포지셔닝과 z-index */}
                {isMobileOpen && (
                    <div
                        id="mobile-menu"
                        className="absolute inset-x-0 top-full origin-top bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-xl z-50 sm:hidden"
                    >
                        <HeaderNavMobile items={navItems} onNavClick={handleNavClick} />
                    </div>
                )}
            </div>
        </div>
    );
}