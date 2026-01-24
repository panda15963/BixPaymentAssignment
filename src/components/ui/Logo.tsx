import { Link } from "react-router-dom";

export default function HeaderLogo() {
    return (
        <div className="flex shrink-0 items-center">
            <Link to="/">
                <img
                    alt="Your Company"
                    src="/vite.jpeg"
                    className="h-8 w-auto dark:hidden"
                />
            </Link>
            <Link to="/">
                <img
                    alt="Your Company"
                    src="/vite.jpeg"
                    className="h-8 w-auto not-dark:hidden"
                />
            </Link>
        </div>
    );
}