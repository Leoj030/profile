import { NextRequest, NextResponse } from "next/server";
import { analyzeResume } from "@/utils/aiAnalysis";
import { sanitizeResume } from "@/utils/sanitizeResume";
import { worker2, worker3 } from "@/utils/prompt";
import { ResumeHeuristicEngine } from "@/utils/ResumeHeuristicEngine";
import { supabase } from "@/utils/supabaseClient";
import { uploadFile } from "@/utils/uploadFile";

const ResumeEngine = new ResumeHeuristicEngine();

export async function POST(req: NextRequest) {
    try {
        const formData = req.formData();
        const file = (await formData).get("file") as File;
        const buffer = Buffer.from(await file.arrayBuffer());
        const sanitizedText = await sanitizeResume(buffer);

        // const worker1Promise = analyzeResume(sanitizedText, worker1);
        const worker1Promise = ResumeEngine.analyze(new Uint8Array(buffer));
        const worker2Promise = analyzeResume(sanitizedText, worker2);
        const worker3Promise = analyzeResume(sanitizedText, worker3);

        const [layoutResult, analysisResult, semanticResult] = await Promise.all([
            worker1Promise,
            worker2Promise,
            worker3Promise
        ]);

        const filename = `${Date.now()}-${file.name}`;
        // const imgId = await uploadFile(await doc.getPage(1), "ResumeIMG", filename, 'image/png');

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ message: "Incorrect file type" }, { status: 400 });
        }
        
        await uploadFile(file, "ResumePDF", filename, file.type);

        const finalResult = {
            content: analysisResult.content,
            grammar: analysisResult.grammar,
            skills: semanticResult.skills,
            atsSemantic: semanticResult.atsSemantic,
            atsLayout: {
                score: layoutResult.score,
                workingWell: layoutResult.remarks.workingWell,
                improvements: layoutResult.remarks.improvements
            }
        };

        const { data: resultData, error: resultError } = await supabase
            .from('evaluation_result')
            .insert({ result: finalResult, reference_id: filename })
            .select('id');

        if (resultError) {
            throw resultError;
        }

        return NextResponse.json({ message: "Resume analysis is successful", result_id: resultData[0].id, sanitizedText: sanitizedText }, { status: 201 });
    } catch (error) {
        console.error("Error in resume analysis:", error);
        return NextResponse.json({ error: "Failed to analyze resume, internal server error" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ msg: "This is resume analysis GET route" });
}
