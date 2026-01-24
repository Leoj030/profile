'use client';

import { useState, useEffect } from "react";

export default function HeroTagline() {
    const [text, setText] = useState('Evaluation');
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsExiting(true);
            
            setTimeout(() => {
                setText(prev => prev === 'Evaluation' ? 'Screening' : 'Evaluation');
                setIsExiting(false);
            }, 800);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <h1 className="text-main text-[35px] font-bold text-center">
            Smarter Resume <span className={`text-main-gradient ${isExiting ? 'word-exit' : 'word-enter'}`}>{text}</span> Powered by AI
        </h1>
    );
}