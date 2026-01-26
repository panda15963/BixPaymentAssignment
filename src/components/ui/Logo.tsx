import { Link } from 'react-router-dom';
import type { User } from '../../stores/useAuthStore';

interface HeaderLogoProps {
    user: User | null;
}

export default function HeaderLogo({ user }: Readonly<HeaderLogoProps>) {
    const targetPath = user ? '/posts' : '/';
    console.log(user);
    console.log(targetPath);
    return (
        <div className="flex shrink-0 items-center">
            <Link to={targetPath}>
                <img
                    alt="Your Company"
                    src="/vite.jpeg"
                    className="h-8 w-auto dark:hidden"
                />
            </Link>
            <Link to={targetPath}>
                <img
                    alt="Your Company"
                    src="/vite.jpeg"
                    className="h-8 w-auto not-dark:hidden"
                />
            </Link>
        </div>
    );
}