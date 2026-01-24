import { CheckCircle2, FileCheckIcon, XIcon } from "lucide-react";
import { supabase } from "@/utils/supabaseClient";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "../ui/Button";

interface ConfirmationProps {
  file: File;
  fileName: string;
  fileSize: number;
  onReset: () => void;
}

interface IResponseData {
    result_id: string;
}

const truncateFileName = (name: string, maxLength: number = 10) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExt = name.slice(0, name.lastIndexOf('.'));
    const truncated = nameWithoutExt.slice(0, maxLength - 3) + '...';
    return `${truncated}.${extension}`;
};

const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2);
};

export default function Confirmation({ file, fileName, fileSize, onReset }: ConfirmationProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const redirectHandler = (resultId: string) => {
        router.push(`/resume-evaluation/${resultId}`);
    }

    const handleFileUpload = async (file: File) => {
        const startTime = Date.now();

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE}/resume-analysis`, formData);
            const responseData = await res.data as IResponseData;

            const endTime = Date.now();
            const duration = endTime - startTime;

            console.log(`✅ Server response received in: ${duration} ms`);
            
            const { data, error } = await supabase
            .from('evaluation_result')
            .update({ dur: duration })
            .eq('id', responseData.result_id) 
            .select();

            if (error) {
            console.error('Error updating username:', error);
            }
            else if (data.length === 0) {
                console.warn('Update successful, BUT zero rows were affected. Check the ID.', responseData.result_id);
            } 
            else {
                console.log('Successfully updated row(s):', data);
            }

            redirectHandler(responseData.result_id);
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isLoading) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "auto";
        }

        return () => {
        document.body.style.overflow = "auto";
        };
    }, [isLoading]);

    return (
        <div className="h-90 w-full bg-slate-50/50 dark:bg-slate-50/10 border border-slate-200 dark:border-slate-200/10 rounded-xl shadow flex flex-col justify-center items-center">
                <CheckCircle2 className="h-16 w-16 text-green-500"/>
                <p className="my-5 font-medium text-[19px]">Resume Uploaded Successfully</p>
                <div className="h-20 w-[85%] mb-7 bg-green-500/15 border border-green-500/50 rounded-xl flex justify-around items-center">
                    <div className="flex justify-center items-center">
                        <div className="h-13 w-13 bg-green-400/20 flex justify-center items-center rounded-full">
                            <FileCheckIcon className="h-7 w-7 text-green-500"/>
                        </div>
                        <div>
                            <p className="ml-3 font-medium truncate max-w-[200px]">{truncateFileName(fileName)}</p>
                            <p className="ml-3 text-xs">{formatFileSize(fileSize)} MB</p>
                        </div>
                    </div>
                    <button onClick={onReset}>
                        <XIcon className="h-6 w-6"/>
                    </button>
                </div>
                <Button className="bg-grad-blue active-bg-grad-blue" onClick={() => handleFileUpload(file)} disabled={isLoading}>
                    {isLoading ? "Analyzing..." : "Start Evaluation"}
                </Button>
                {isLoading && (
                    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-50">
                        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        <p className="text-white mt-4 text-lg">Analyzing your resume...</p>
                    </div>
                )}
        </div>
    );
}