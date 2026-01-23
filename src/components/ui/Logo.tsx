export default function HeaderLogo() {
    return (
        <div className="flex shrink-0 items-center">
            <img alt="Your Company" src="/vite.jpeg" className="h-8 w-auto dark:hidden" />
            <img alt="Your Company" src="/vite.jpeg" className="h-8 w-auto not-dark:hidden" />
        </div>
    );
}
