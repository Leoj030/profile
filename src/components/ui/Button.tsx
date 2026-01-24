import cn from "@/utils/cn"

const variants = {
    primary: "bg-btn-primary text-gray-100 font-semibold py-2 px-4 rounded hover:scale-95 transition-all duration-300 ease-in-out",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded",
    outline: "border-2 border-slate-400/50 dark:border-slate-700 text-main font-semibold hover:bg-slate-400/50 hover:dark:bg-slate-200/50 hover:border-0 hover:scale-95 transition-all duration-300 ease-in-out",
    none: "",
}

export default function Button({ variant = "primary", className, children, onClick, disabled }:{ variant?: keyof typeof variants, className?: string, children:React.ReactNode, onClick?: () => Promise<void> | void, disabled?: boolean}) {
    return (
        <button className={cn(variants[variant], className)} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}