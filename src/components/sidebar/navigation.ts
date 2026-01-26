import {
    HomeIcon,
    UsersIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    ChartPieIcon,
} from '@heroicons/react/24/outline'
import type { ComponentType, SVGProps } from 'react'
import type { BoardCategoryResponse } from '../../api/post'

export type NavigationItem = {
    name: string
    to: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

const categoryIconMap: Record<string, NavigationItem['icon']> = {
    NOTICE: HomeIcon,
    FREE: UsersIcon,
    QNA: DocumentDuplicateIcon,
    ETC: FolderIcon,
}

export const buildNavigationFromCategories = (
    categories: BoardCategoryResponse
): NavigationItem[] => {
    return (Object.entries(categories)).map(
        ([code, label]) => ({
            name: label,
            to: `/posts?category=${code}`,
            icon: categoryIconMap[code] ?? ChartPieIcon,
        })
    )
}