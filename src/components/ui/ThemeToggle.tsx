'use client';

import { useTheme } from "next-themes";
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const currentTheme = resolvedTheme;

    return (
        <button type="button" aria-label="Toggle theme" title="Toggle Theme" onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
        className="cursor-pointer absolute -translate-y-1.5 lg:translate-y-0.5 -translate-x-15 p-2 rounded-lg transition-all duration-300 active:bg-gray-200 dark:active:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
            {currentTheme === 'dark' ? <Sun color='#d1d5dc' size={20}/> : <Moon color='#364153' size={20} />}
        </button>
    );
}