import PrimaryButton from "./ui/PrimaryButton";

export default function SideBar({ scaleX }: { scaleX: number }) {
    return (
        // TODO: Style the navigation buttons inside the sidebar
        <aside className={`bg-gray-100 dark:bg-[#0f1629] fixed top-16 right-0 h-screen w-76 origin-right transform ${scaleX === 100 ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-300 ease-in-out z-50 shadow shadow-gray-500/30`}>
            <nav>
                <ul>
                    <li className="m-5 p-2 border-b border-gray-600/5 dark:border-gray-300/5 text-main">
                        <button>Features</button>
                    </li>
                    <li className="m-5 p-2 border-b border-gray-600/5 dark:border-gray-300/5 text-main">
                        <button>How It Works</button>
                    </li>
                    <li className="m-5 p-2 border-b border-gray-600/5 dark:border-gray-300/5 text-main">
                        <button>Pricing</button>
                    </li>
                </ul>
            </nav>

            <section className="relative h-full flex justify-center bottom-5">
                <section className="flex flex-col items-center justify-center m-5 gap-2 relative">
                    <PrimaryButton ariaLabel="Get started" className="w-64 h-10 rounded-xl">Get Started</PrimaryButton>
                    <button aria-label="Sign in" className="w-64 h-10 rounded-xl font-medium bg-transparent active:bg-gray-600/10 active:text-gray-600 dark:active:bg-blue-400/10 dark:active:text-gray-300 active:scale-95 transition-all duration-200 ease-in-out">
                        Sign In
                    </button>
                </section>
            </section>
        </aside>
    );
}