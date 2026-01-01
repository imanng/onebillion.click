"use client";

import React, { useCallback, useState } from "react";

type Props = {
    gridSize: number;
    viewportSize: { width: number; height: number };
    scrollPosition: { x: number; y: number };
    onNavigate: (x: number, y: number) => void;
};

export function Minimap({
    gridSize,
    viewportSize,
    scrollPosition,
    onNavigate,
}: Props) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const minimapSize = 280;
    const scale = minimapSize / gridSize;

    const viewportWidth = Math.min(viewportSize.width * scale, minimapSize);
    const viewportHeight = Math.min(viewportSize.height * scale, minimapSize);
    const viewportX = Math.min(scrollPosition.x * scale, minimapSize - viewportWidth);
    const viewportY = Math.min(scrollPosition.y * scale, minimapSize - viewportHeight);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Convert minimap coordinates to grid coordinates
            const gridX = (x / minimapSize) * gridSize - viewportSize.width / 2;
            const gridY = (y / minimapSize) * gridSize - viewportSize.height / 2;

            onNavigate(
                Math.max(0, Math.min(gridX, gridSize - viewportSize.width)),
                Math.max(0, Math.min(gridY, gridSize - viewportSize.height))
            );
        },
        [gridSize, viewportSize, onNavigate]
    );

    if (gridSize <= 0) return null;

    return (
        <div
            className={`fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out ${isCollapsed ? "right-0 translate-x-[calc(100%-40px)]" : "right-4 translate-x-0"
                }`}
        >
            <div className="flex items-stretch">
                {/* Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center justify-center w-10 bg-background/80 backdrop-blur-xl border border-r-0 border-border/40 rounded-l-xl hover:bg-muted/50 transition-colors"
                    aria-label={isCollapsed ? "Open navigator" : "Close navigator"}
                >
                    <svg
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""
                            }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>

                {/* Minimap Panel */}
                <div className="p-3 bg-background/80 backdrop-blur-xl border border-border/40 rounded-r-xl shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2 px-1">
                        <div className="flex items-center gap-2">
                            <svg
                                className="h-4 w-4 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                            </svg>
                            <span className="text-xs font-medium text-muted-foreground">Navigator</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Click to navigate</span>
                    </div>

                    {/* Minimap */}
                    <div
                        className="relative cursor-crosshair rounded-lg overflow-hidden border border-border/60"
                        style={{ width: minimapSize, height: minimapSize }}
                        onClick={handleClick}
                    >
                        {/* Grid background */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
                            style={{
                                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                                backgroundSize: `${minimapSize / 10}px ${minimapSize / 10}px`,
                            }}
                        />

                        {/* Viewport indicator (magnifying glass area) */}
                        <div
                            className="absolute border-2 border-violet-500 bg-violet-500/20 rounded-sm transition-all duration-150 ease-out shadow-lg"
                            style={{
                                width: Math.max(viewportWidth, 10),
                                height: Math.max(viewportHeight, 10),
                                left: viewportX,
                                top: viewportY,
                            }}
                        >
                            {/* Corner indicators */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-violet-500 rounded-full" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-violet-500 rounded-full" />
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-violet-500 rounded-full" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-violet-500 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
