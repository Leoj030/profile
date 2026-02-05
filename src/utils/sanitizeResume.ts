import { pdfLoader } from './pdf-loader';

export async function sanitizeResume(buffer: Buffer): Promise<string> {
    const rawText = await pdfLoader(new Uint8Array(buffer));

    const lines = rawText.split("\n");

    let nameCandidate: string | null = null;

    const isLikelyName = (line: string) => {
        const words = line.split(/\s+/);
        if (words.length < 2 || words.length > 4) return false;
        if (/[0-9@]/.test(line)) return false;
        if (!words.every(w => /^[A-Z][a-z.'-]+$/.test(w))) return false;
        return true;
    };

    for (const ln of lines) {
        if (
            /^(ABOUT ME|EDUCATION|KNOWLEDGE|PERSONAL INFORMATION|PROJECTS|EXPERIENCE|SKILLS)$/i.test(
                ln
            )
        ) {
            continue;
        }
        if (isLikelyName(ln)) {
            nameCandidate = ln;
            break;
        }
    }

    let text = rawText;

    if (nameCandidate) {
        const escaped = nameCandidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const nameRegex = new RegExp(`\\b${escaped}\\b`, "g");
        text = text.replace(nameRegex, " John Doe ");
    }

    text = text.replace(
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi,
        " johndoe123@example.com "
    );

    text = text.replace(
        /(?:\+?\d{1,3}[-. \t]?)?\(?\d{2,4}\)?[-. \t]?\d{3,4}[-. \t]?\d{3,9}/g,
        " +6312 3456 7890 "
    );

    // text = text.replace(
    //     /(https?:\/\/[^\s]+)/g,
    //     " [REDACTED_URL] "
    // );

    return text;
}

