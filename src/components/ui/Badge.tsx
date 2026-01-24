interface BadgeProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

export default function Badge({ icon, title, description, className }: BadgeProps) {
    return (
        <div className="flex items-center gap-4 mt-5">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${className}`}>
                {icon}
            </div>

            <div>
                <h4 className="text-main text-2xl font-bold text-center">{title}</h4>
                <p className="text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>
    );
}