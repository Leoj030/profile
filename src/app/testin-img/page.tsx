import PdfPreview from "@/components/toImg";

export default function ResumeEvaluation() {
    return (
        <div className="flex items-center justify-center p-4 mt-16">
            <PdfPreview 
            className="rounded-xl shadow-lg border-5 border-blue-500 w-2xs lg:w-125" 
            pdfUrl="https://hngtpbvmmsnwaxwlxsgh.supabase.co/storage/v1/object/sign/ResumePDF/1770193325627-Black%20and%20White%20Minimalist%20Accountant%20Resume.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYmM4Yzg5Yi00MmE3LTRlODktOTRiMy0zZDY0YzczMzczZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJSZXN1bWVQREYvMTc3MDE5MzMyNTYyNy1CbGFjayBhbmQgV2hpdGUgTWluaW1hbGlzdCBBY2NvdW50YW50IFJlc3VtZS5wZGYiLCJpYXQiOjE3NzAyODc1OTEsImV4cCI6MTc3MDg5MjM5MX0.buKMTPvWtA1lo04tkuvPPthWCmFAG8nhF4dEvVF5Els" />
        </div>
    );
}