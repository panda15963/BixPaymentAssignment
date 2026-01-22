import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import { Link } from 'react-router-dom';

const profileItems = [
    { name: '마이페이지', to: '/profile' },
    { name: '로그아웃', to: '/signout' },
];

export default function HeaderProfile() {
    return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full bg-gray-100 outline tnwj-outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
                    />
                </MenuButton>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                >
                    {profileItems.map((item) => (
                        <MenuItem key={item.name}>
                            <Link
                                to={item.to}
                                className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            >
                                {item.name}
                            </Link>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    );
}
