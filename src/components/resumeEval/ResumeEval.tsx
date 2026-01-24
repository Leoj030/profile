'use client'

import Button from "../ui/Button";
import { Upload, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import BrowseResume from "./Browse";

export default function ResumeEval() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBtnClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setSelectedFile(file);
            alert(`Selected File: ${file.name}`);
        }
    }

    return (
        <section className="relative w-full flex justify-center">
            <section className="absolute inset-0 z-0 overflow-hidden">
                <span className="block absolute bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-xl dark:blur-3xl h-35 w-35 rounded-full top-16 -left-0 -translate-x-1/2 animate-pulse"></span>
                <span className="block absolute bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl dark:blur-3xl h-35 w-35 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></span>
                <span className="block absolute bg-gradient-to-r from-blue-400/30 to-cyan-400/30 blur-xl dark:blur-3xl h-35 w-35 rounded-full bottom-0 right-0 translate-x-1/2 animate-pulse"></span>
            </section>

            <section className="relative z-10 flex flex-col items-center pt-36 px-6">
                <h1 className="text-center text-3xl">Upload Your Resume</h1>
                <p className="text-center my-4 text-gray-400 font-medium">
                    Get instant AI-powered analysis in seconds
                </p>


                <input type="file" accept=".pdf, .doc, .docx" ref={fileInputRef} onChange={handleFileChange}className="hidden" />
                {!selectedFile ? <BrowseResume onClick={handleBtnClick} /> : <div>File Selected</div>}
                <br />
                <br />
                <br />
            </section>
        </section>
    );
} 