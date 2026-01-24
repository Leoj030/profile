'use client';

import { useState, useEffect } from "react";
import SideBar from "../SideBar";

export default function Hamburger({ color }: { color: string }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } 
        else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen]);

    return (
        <>
            <div className="flex flex-col w-6 h-6 items-center justify-center lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`block ${color} w-full h-0.5 rounded transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block ${color} w-full h-0.5 rounded transition duration-300 ease-in-out mb-1 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block ${color} w-full h-0.5 rounded transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>

            <SideBar scaleX={isOpen ? 100 : 0} />
        </>
    );
}