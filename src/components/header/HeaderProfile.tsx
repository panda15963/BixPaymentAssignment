import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

export default function HeaderProfile() {
    const navigate = useNavigate();
    const { user, clearUser } = useAuthStore();

    const handleLogout = () => {
        // 토큰 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // 전역 사용자 상태 초기화
        clearUser();

        navigate('/login');
    };

    // 🔹 로그아웃 상태
    if (!user) {
        return (
            <div className="ml-3 flex items-center">
                <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md shadow-sm transition-all duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    로그인
                </Link>
            </div>
        );
    }

    // 🔹 로그인 상태
    return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                    </span>
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute left-1/2 z-10 mt-2 w-48 -translate-x-1/2 origin-top rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition
                               data-closed:scale-95 data-closed:opacity-0
                               data-enter:duration-200 data-enter:ease-out
                               data-leave:duration-75 data-leave:ease-in
                               dark:bg-gray-800 dark:outline-white/10"
                >
                    <MenuItem>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100
                                       dark:text-red-400 dark:hover:bg-gray-700"
                        >
                            로그아웃
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
}