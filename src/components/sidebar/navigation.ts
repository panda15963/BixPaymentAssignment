import {
    HomeIcon,
    UsersIcon,
    FolderIcon,
    CalendarIcon,
    DocumentDuplicateIcon,
    ChartPieIcon,
} from '@heroicons/react/24/outline'

export const navigation = [
    { name: 'Dashboard', to: '/posts', icon: HomeIcon },
    { name: 'Team', to: '/posts/team', icon: UsersIcon },
    { name: 'Projects', to: '/posts/projects', icon: FolderIcon },
    { name: 'Calendar', to: '/posts/calendar', icon: CalendarIcon },
    { name: 'Documents', to: '/posts/documents', icon: DocumentDuplicateIcon },
    { name: 'Reports', to: '/posts/reports', icon: ChartPieIcon },
]
