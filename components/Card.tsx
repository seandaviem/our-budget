export default function Card({ children, className }: { children: React.ReactNode, className?: string}) {

    const classes = `max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 ${className}`;

    return (
        <div className={classes}>
            {children}
        </div>
    );
}