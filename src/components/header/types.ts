export type NavItem = {
    name: string;
    to: string;
    current: boolean;
};

export const navItems: NavItem[] = [
    { name: '대시보드', to: '/dashboard', current: true },
    { name: '팀', to: '/team', current: false },
    { name: '프로젝트', to: '/projects', current: false },
    { name: '캘린더', to: '/calendar', current: false },
];
