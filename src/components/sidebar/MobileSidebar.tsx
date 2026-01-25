'use client';

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
    NavLink,
    useLocation,
} from 'react-router-dom';
import type { ComponentType, SVGProps } from 'react';

export type NavigationItem = {
    name: string;
    to: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type Props = {
    open: boolean;
    onClose: (value: boolean) => void;
    navigation?: NavigationItem[];
};

export default function MobileSidebar({
                                          open,
                                          onClose,
                                          navigation = [],
                                      }: Readonly<Props>) {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const currentCategory = searchParams.get('category');

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden">
            <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />

            <DialogPanel className="fixed inset-y-0 left-0 w-72 bg-white px-6 py-4">
                <div className="mb-6 flex items-center justify-between">
                    <span className="font-bold">Menu</span>
                    <button
                        type="button"
                        onClick={() => onClose(false)}
                        aria-label="Close sidebar"
                    >
                        <XMarkIcon className="size-6" />
                    </button>
                </div>

                <nav className="space-y-1">
                    {navigation.length === 0 ? (
                        <p className="px-3 py-2 text-sm text-gray-400">
                            메뉴를 불러오는 중…
                        </p>
                    ) : (
                        navigation.map((item, index) => {
                            const itemCategory =
                                new URLSearchParams(
                                    item.to.split('?')[1]
                                ).get('category');

                            const isActive =
                                currentCategory === itemCategory ||
                                (!currentCategory && index === 0);

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    onClick={() => onClose(false)}
                                    className={() =>
                                        `flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold
                                        ${
                                            isActive
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                                        }`
                                    }
                                >
                                    <item.icon className="size-5 shrink-0" />
                                    {item.name}
                                </NavLink>
                            );
                        })
                    )}
                </nav>
            </DialogPanel>
        </Dialog>
    );
}