import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from './types';

interface Props {
    readonly items: readonly NavItem[];
    readonly onNavClick?: () => void;
}

export default function HeaderNavMobile({ items, onNavClick }: Props) {
    const location = useLocation();

    const baseClasses =
        'block border-l-4 py-2 pr-4 pl-3 text-base font-medium';
    const currentClasses =
        'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-600/10 dark:text-indigo-400';
    const defaultClasses =
        'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white';

    return (
        <div className="space-y-1 pt-2 pb-4 px-2">
            {items.map((item) => {
                const isCurrent =
                    item.to === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(item.to);

                return (
                    <Link
                        key={item.name}
                        to={item.to}
                        className={`${baseClasses} ${
                            isCurrent ? currentClasses : defaultClasses
                        }`}
                        aria-current={isCurrent ? 'page' : undefined}
                        onClick={onNavClick} // 메뉴 닫기만 담당
                    >
                        {item.name}
                    </Link>
                );
            })}
        </div>
    );
}