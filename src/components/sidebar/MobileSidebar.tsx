'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { navigation } from './navigation'

type Props = {
    open: boolean
    onClose: (value: boolean) => void
}

export default function MobileSidebar(
    { open, onClose }: Readonly<Props>
) {
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
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.to}
                            onClick={() => onClose(false)}
                            className="flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold hover:bg-gray-50"
                        >
                            <item.icon className="size-5 shrink-0" />
                            {item.name}
                        </a>
                    ))}
                </nav>
            </DialogPanel>
        </Dialog>
    )
}