import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from './types';
import { User } from '../../stores/useAuthStore';

interface Props {
    readonly items: NavItem[];
    readonly user: User | null;
}

export default function HeaderNavDesktop({ items, user }: Props) {
    const location = useLocation();
    console.log(user);

    const baseClasses =
        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium';
    const currentClasses =
        'border-indigo-600 text-gray-900 dark:border-indigo-500 dark:text-white';
    const defaultClasses =
        'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white';

    return (
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {items
                .filter((item) => {
                    return !(item.to === '/posts' && !user);

                })
                .map((item) => {
                    const isCurrent =
                        location.pathname === item.to ||
                        location.pathname.startsWith(item.to + '/');

                    return (
                        <Link
                            key={item.name}
                            to={item.to}
                            className={`${baseClasses} ${
                                isCurrent
                                    ? currentClasses
                                    : defaultClasses
                            }`}
                            aria-current={isCurrent ? 'page' : undefined}
                        >
                            {item.name}
                        </Link>
                    );
                })}
        </div>
    );
}