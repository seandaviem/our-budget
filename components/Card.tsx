export default function Card({ children, className }: { children: React.ReactNode, className?: string}) {

    const classes = `max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`;

    return (
        <div className={classes}>
            {children}
        </div>
    );
}