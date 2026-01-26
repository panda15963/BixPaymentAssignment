import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../../stores/useAuthStore';

interface HeaderProfileProps {
    user: User | null;
    onLogout: () => void;
}

export default function HeaderProfile(
    { user, onLogout }: Readonly<HeaderProfileProps>
) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 토큰 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Header에서 내려준 로그아웃 로직 실행
        onLogout();

        navigate('/login', { replace: true });
    };

    // 🔹 로그아웃 상태
    if (!user) {
        return (
            <div className="ml-3 flex items-center">
                <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600
                    hover:bg-blue-700 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    rounded-md shadow-sm transition-all duration-200
                    dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    로그인
                </Link>
            </div>
        );
    }

    // 🔹 로그인 상태
    return (
        <div className="flex items-center">
            <Menu as="div" className="relative ml-3">
                <MenuButton
                    className="relative flex items-center gap-2 rounded-full
                    focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500"
                >
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                    </span>
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 max-w-[90vw]
                    origin-top-right rounded-md bg-white py-1 shadow-lg
                    outline outline-black/5 transition
                    data-closed:scale-95 data-closed:opacity-0
                    data-enter:duration-200 data-enter:ease-out
                    data-leave:duration-75 data-leave:ease-in
                    dark:bg-gray-800 dark:outline-white/10"
                >
                    <MenuItem>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center px-4 py-2
                            text-sm font-medium text-red-600
                            hover:bg-gray-100
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