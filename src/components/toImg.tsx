"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Define the interface for the props
interface PdfPreviewProps {
    pdfUrl: string;
    width?: number; // Optional: Force a specific width (in px)
    className?: string; // Optional: Add custom styling to the wrapper
}

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPreview({
    pdfUrl,
    width,
    className = "",
}: PdfPreviewProps) {
    // State to store the measured width of the container (for auto-sizing)
    const [elementWidth, setElementWidth] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If the user provided a fixed 'width' prop, we don't need to measure anything.
        if (width) return;

        const measure = () => {
            if (containerRef.current) {
                setElementWidth(containerRef.current.clientWidth);
            }
        };

        // Initial measure
        measure();

        // Otherwise, measure the container to make it responsive
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { width } = entries[0].contentRect;
                // Subtract a little padding to prevent scrollbar flicker if needed
                setElementWidth(width);
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [width]); // Re-run if 'width' prop changes

    // Logic: Use the prop if provided, otherwise use the measured state
    const finalWidth = width || elementWidth;

    return (
        <div
            ref={containerRef}
            className={`flex justify-center bg-gray-50 border border-gray-200 overflow-hidden w-full ${className}`}
        >
            <Document
                file={pdfUrl}
                loading={
                    <div className="p-10 text-gray-400 text-sm">Loading...</div>
                }
                error={<div className="p-10 text-red-400 text-sm">Error</div>}
                className="w-full flex justify-center"
            >
                {finalWidth && (
                    <Page
                        pageNumber={1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={finalWidth}
                    />
                )}
            </Document>
        </div>
    );
}
