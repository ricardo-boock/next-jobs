"use client";

import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";
import {
    useEffect, useState, useSyncExternalStore
} from "react";

const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

function subscribeToColorScheme(callback: () => void) {
    const mediaQuery = window.matchMedia(DARK_MODE_QUERY);

    mediaQuery.addEventListener("change", callback);

    return () => {
        mediaQuery.removeEventListener("change", callback);
    }
}

function getColorSchemeSnapshot() {
    return window.matchMedia(DARK_MODE_QUERY).matches;
}

function getServerSnapshot() {
    return false;
}

export default function ColorSchemeSwitch() {
    const systemPrefersDark = useSyncExternalStore(
        subscribeToColorScheme,
        getColorSchemeSnapshot,
        getServerSnapshot
    );

    const [userPreference, setUserPreference] = useState<boolean | null>(null);

    const isDarkMode = userPreference ?? systemPrefersDark;

    useEffect(() => {
        if (isDarkMode === null) return;

        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    return (
        <>
            <input
                id="color-scheme-switch"
                type="checkbox"
                role="switch"
                aria-label="Toggle dark mode"
                className={cn("sr-only peer")}
                checked={isDarkMode}
                onChange={(e) => setUserPreference(e.target.checked)}
            />
            <label
                htmlFor="color-scheme-switch"
                className={cn(
                    "flex h-5 w-10 cursor-pointer items-center rounded-full bg-gray-300 p-0.5 transition-colors peer-checked:bg-blue-500"
                )}
            >
                <Sun className="h-4 w-4" />

                <span
                    className={cn(
                        "h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                        isDarkMode && "translate-x-1"
                    )}
                />

                <Moon className="h-4 w-4" />
            </label>
        </>
    );
}