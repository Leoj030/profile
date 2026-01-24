interface IBgBadge {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    badgeClassName?: string;
    iconClassName?: string;
    textClassName?: string;
}

export default function BgBadge({ children, icon, badgeClassName, iconClassName, textClassName }: IBgBadge) {
    return (
        <div className={`h-13 ${badgeClassName} m-4 p-4 rounded-2xl flex items-center justify-center border`}>
            <div className={`h-8 w-8 ${iconClassName} rounded-full flex items-center justify-center`}>
                {icon}
            </div>

            <span className={`p-2 ${textClassName} font-medium`}>{children}</span>
        </div>
    );
}