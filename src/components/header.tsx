"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { totalClicksAtom } from "@/stores";

export function Header() {
    const [totalClicks] = useAtom(totalClicksAtom);
    const progress = Math.min((totalClicks / 1000000000) * 100, 100);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg">
                            <span className="text-xl font-bold text-white">1B</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            One Billion Clicks
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Click together, reach the goal
                        </span>
                    </div>
                </Link>

                {/* Total clicks badge with progress background */}
                <div className="relative flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber-500/20 overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />

                    {/* Progress fill */}
                    <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500/30 to-orange-500/30 transition-all duration-500 ease-out"
                        style={{ width: `${Math.max(progress, 0.5)}%` }}
                    />

                    {/* Content */}
                    <svg
                        className="relative h-5 w-5 text-amber-500 animate-heartbeat"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                    <span className="relative text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent tabular-nums">
                        {totalClicks.toLocaleString()}
                    </span>
                </div>
            </div>
        </header>
    );
}
