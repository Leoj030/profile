// app/result/[id]/page.tsx
import { supabase } from "@/utils/supabaseClient";
import EvaluationDashboard, { IResultObject } from "./EvaluationDashboard";

interface ResultPageProps {
    params: Promise<{ id: string }>;
}

interface IResult {
    id: string;
    result: IResultObject;
    reference_id: string;
    dur: number;
}

// ✅ Fetch data from Supabase
const getResult = async (id: string) => {
    const { data, error } = await supabase
        .from("evaluation_result")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }
    return data as IResult;
};

// ✅ Render page (async because it fetches server-side)
export default async function Result({ params }: ResultPageProps) {
    try {
        const { id } = await params;
        const dataResult = await getResult(id);

        if (!dataResult) {
            console.error("Result not found");
            return;
        }

        const { result, reference_id, dur } = dataResult;

        const { data: signedUrlData, error: signedUrlError } =
            await supabase.storage
                .from("ResumePDF")
                .createSignedUrl(reference_id, 3600); // 1 hour expiration

        const pdfUrl = signedUrlData?.signedUrl || "";

        if (signedUrlError) {
            console.error("Error creating signed URL:", signedUrlError);
        }

        return (
            // eslint-disable-next-line react-hooks/error-boundaries
            <EvaluationDashboard
                result={result}
                pdfUrl={pdfUrl}
                duration={dur}
            />
        );
    } catch (error) {
        console.error(error);
        return (
            <section className="text-center pt-36">
                <h1 className="text-2xl font-bold text-red-500">
                    Result not found
                </h1>
            </section>
        );
    }
}
