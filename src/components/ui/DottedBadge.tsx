interface IDottedBadge {
    children?: React.ReactNode;
    icon?: React.ReactNode;
}


export default function DottedBadge({ children, icon, }: IDottedBadge) {
  return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 mb-5">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            {icon}
            <span className="text-xs font-medium text-indigo-900 dark:text-indigo-100">{children}</span>
        </div>
    );
}
