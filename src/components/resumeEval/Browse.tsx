import Button from "../ui/Button";
import { Upload } from "lucide-react";

export default function BrowseResume({ onClick }: { onClick?: () => void }){
    return (
        <div className="h-90 w-full bg-slate-50/50 dark:bg-slate-50/10 border border-slate-200 dark:border-slate-200/10 rounded-xl shadow flex justify-center items-center">
            <button type="button" onClick={onClick} className="h-11/12 w-11/12 border-2 border-dashed border-blue-200 rounded-md bg-blue-200/5 flex flex-col justify-center items-center">
                <div className="bg-grad-blue h-25 w-25 rounded-full shadow flex justify-center items-center -translate-y-6">
                    <Upload color="white" className="h-13 w-13"/>
                </div>
                <p className="text-xl -translate-y-5 p-2">Tap to Choose a File</p>
                <p className="text-[15px] -translate-y-8 text-[#86888d]">Select your resume from your device</p>
                <Button className="h-13 w-40 flex gap-2 justify-center items-center bg-grad-blue active-bg-grad-blue cursor-pointer">
                    <Upload className="h-5 w-5"/>
                    Browse Files
                </Button>
                <p className="text-[16px] text-[#86888d] translate-y-3">PDF . Max 2MB</p>
            </button>
        </div>
    );
}