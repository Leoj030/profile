'use client'

import { useState, useRef } from "react";
import Browse from "./Browse";
import Confirmation from "./Confirmation";

export default function TheResume() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBtnClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setSelectedFile(file);
        }
    }

    const handleReset = () => {
        setSelectedFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <section className="w-full">
            {selectedFile ? <Confirmation 
                                file={selectedFile}
                                fileName={selectedFile.name}
                                fileSize={selectedFile.size}
                                onReset={handleReset}
        /> : <Browse onClick={handleBtnClick} />}
            <input type="file" accept=".pdf" ref={fileInputRef} name="resumeFile" onChange={handleFileChange} className="hidden" />
        </section>
    );
} 