import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import type { NavItem } from './types';
import { useNavStore } from '../../stores/useNavStore'; // 경로 조정

interface Props {
    readonly items: NavItem[];
}

export default function HeaderNavDesktop({ items }: Props) {
    const { currentNav, setCurrentNav } = useNavStore();
    const location = useLocation();

    useEffect(() => {
        const pathName = location.pathname.split('/')[1] || 'dashboard';
        const navName = pathName.charAt(0).toUpperCase() + pathName.slice(1);
        setCurrentNav(navName);
    }, [location, setCurrentNav]);

    const baseClasses = 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium';
    const currentClasses = 'border-indigo-600 text-gray-900 dark:border-indigo-500 dark:text-white';
    const defaultClasses = 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white';

    return (
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {items.map((item) => (
                <Link
                    key={item.name}
                    to={item.to}
                    className={`${baseClasses} ${item.name === currentNav ? currentClasses : defaultClasses}`}
                    aria-current={item.name === currentNav ? 'page' : undefined}
                    onClick={() => setCurrentNav(item.name)}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
}