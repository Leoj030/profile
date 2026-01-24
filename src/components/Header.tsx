'use client';

import Hamburger from "./ui/Hamburger";
import ThemeToggle from "./ui/ThemeToggle";
import PrimaryButton from "./ui/PrimaryButton";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const clickHandler = () => {
        router.push(`/`);
    }

    return (
        <header className="w-full h-16 fixed top-0 left-0 bg-header flex justify-between items-center px-6 backdrop-blur-xl shadow shadow-gray-300/25 dark:shadow-gray-700/30 z-50">
            <section className="flex">
                <button className="cursor-pointer" onClick={clickHandler}>
                    <h1 className="montserrat-alternates text-2xl font-medium text-main-gradient">ProFile</h1>
                </button>
            </section>

                <nav className="hidden lg:block ml-20">
                    <ul className="flex font-medium">
                        <li className="m-5 p-2 text-main">
                            <button className="cursor-pointer hover:text-purple-800 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out">Features</button>
                        </li>
                        <li className="m-5 p-2 text-main">
                            <button className="cursor-pointer hover:text-purple-800 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out">How It Works</button>
                        </li>
                        <li className="m-5 p-2 text-main">
                            <button className="cursor-pointer hover:text-purple-800 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out">Pricing</button>
                        </li>
                    </ul>
                </nav>
                
            <section>
                <ThemeToggle />
                <Hamburger color="bg-[#364153] dark:bg-[#d1d5dc]" />

                <section className="items-center justify-center gap-2 relative hidden lg:flex">
                    <button aria-label="Sign in" className="w-24 h-10 rounded-xl font-medium bg-transparent active:bg-gray-600/10 active:text-gray-600 dark:active:bg-blue-400/10 dark:active:text-gray-300 active:scale-95 transition-all duration-200 ease-in-out">
                        Sign In
                    </button>
                    <PrimaryButton ariaLabel="Get started" className="w-30 h-10 rounded-xl">Get Started</PrimaryButton>
                </section>
            </section>

            

                            
        </header>
    );
}