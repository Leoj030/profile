import { getDocumentProxy, extractText } from "unpdf";

type UserLevel = 'ENTRY_LEVEL' | 'PROFESSIONAL';

export class ResumeHeuristicEngine {
    private rawText: string = "";

    private readonly HEADERS_MAP = {
        experience: /work experience|professional experience|employment history|experience/i,
        education: /education|academic background/i,
        skills: /skills|technical skills|core competencies/i,
        projects: /projects|personal projects|academic projects/i,
    };

    async analyze(fileBuffer: Uint8Array, level: UserLevel = 'ENTRY_LEVEL') {
        const pdf = await getDocumentProxy(fileBuffer);
        const { text } = await extractText(pdf, { mergePages: true });
        this.rawText = text;

        const [layout, sections, contact, skills] = await Promise.all([
            this.checkLayout(pdf),
            this.checkSections(level),
            this.checkContactInfo(),
            this.checkDualSkills()
        ]);

        // LEVEL-BASED WEIGHTING LOGIC
        let finalScore: number;

        if (level === 'ENTRY_LEVEL') {
            // Priority: Projects & Skills (Experience is a bonus)
            finalScore = Math.round(
                (layout.score * 0.3) + 
                (sections.projectScore * 0.4) + 
                (skills.score * 0.2) + 
                (contact.score * 0.1)
            );
        } else {
            // Priority: Experience (Projects are secondary)
            finalScore = Math.round(
                (layout.score * 0.2) + 
                (sections.experienceScore * 0.5) + 
                (skills.score * 0.2) + 
                (contact.score * 0.1)
            );
        }

        return {
            text: this.rawText,
            score: finalScore,
            levelAnalyzed: level,
            remarks: {
                "workingWell": [...layout.pros, ...sections.pros, ...contact.pros, ...skills.pros],
                "improvements": [...layout.cons, ...sections.cons, ...contact.cons, ...skills.cons]
            }
        };
    }

    private checkSections(level: UserLevel) {
        const pros = [];
        const cons = [];
        
        const hasExp = this.HEADERS_MAP.experience.test(this.rawText);
        const hasProj = this.HEADERS_MAP.projects.test(this.rawText);
        const hasEdu = this.HEADERS_MAP.education.test(this.rawText);

        // Scoring logic shifts based on level
        let experienceScore = hasExp ? 100 : 0;
        let projectScore = hasProj ? 100 : 0;

        if (level === 'ENTRY_LEVEL') {
            if (hasProj) pros.push("Strong project section found (vital for Entry-Level).");
            if (!hasProj) cons.push("Entry-level resumes must showcase projects if experience is limited.");
            if (hasExp) pros.push("Bonus: Professional experience detected on entry-level resume.");
        } else {
            if (!hasExp) cons.push("Professional resumes require a dedicated 'Experience' section.");
            if (hasExp) pros.push("Clear professional experience history found.");
        }

        if (hasEdu) pros.push("Education history is clear.");
        
        return { experienceScore, projectScore, pros, cons };
    }

    private checkDualSkills() {
        // Technical Skills: Programming, Tools, Frameworks
        const techPatterns = /typescript|javascript|react|node|express|sql|python|aws|git|docker/i;
        // Soft Skills: Leadership, Communication, Teamwork
        const softPatterns = /communication|leadership|teamwork|collaboration|problem solving|management/i;

        const hasTech = techPatterns.test(this.rawText);
        const hasSoft = softPatterns.test(this.rawText);

        const pros = [];
        const cons = [];

        if (hasTech) pros.push("Hard technical skills identified.");
        else cons.push("Technical skills section seems weak or missing keywords.");

        if (hasSoft) pros.push("Soft skills (communication/collaboration) identified.");
        else cons.push("Consider adding soft skills to show how you work in a team.");

        return { 
            score: (hasTech ? 70 : 0) + (hasSoft ? 30 : 0), 
            pros, 
            cons 
        };
    }

    private checkContactInfo() {
        // Updated resilient patterns
        const hasEmail = /\S+@\S+\.\S+/.test(this.rawText);
        
        // Improved phone regex to catch "+6392 6635 8060" format
        const phoneRegex = /\+?\d{1,4}([\s.-]?\d{3,4}){1,3}/;
        const hasPhone = phoneRegex.test(this.rawText);
        
        // Specifically looking for a URL link to a GitHub profile
        const hasGitHubLink = /github\.com\/[a-zA-Z0-9._-]+/i.test(this.rawText);

        const pros = [];
        const cons = [];

        if (hasEmail) pros.push("Email address detected."); else cons.push("No email detected.");
        if (hasPhone) pros.push("Phone number detected."); else cons.push("No phone number detected.");
        if (hasGitHubLink) pros.push("GitHub profile link detected."); else cons.push("Missing GitHub profile link (URL).");

        const score = ((+hasEmail + +hasPhone + +hasGitHubLink) / 3) * 100;
        return { score, pros, cons };
    }

    private async checkLayout(pdf: any) {
        const page = await pdf.getPage(1);
        const { width } = page.getViewport({ scale: 1 });
        const { items } = await page.getTextContent();
        
        const middleX = width / 2;
        const deadZone = 30;
        
        let crossingBlocks = 0;
        let totalSignificantBlocks = 0;

        (items as any[]).forEach(item => {
            if (item.str.trim().length > 15) {
                totalSignificantBlocks++;
                const xStart = item.transform[4];
                const itemWidth = item.width || (item.str.length * 6);
                const xEnd = xStart + itemWidth;

                if (xStart < (middleX - deadZone) && xEnd > (middleX + deadZone)) {
                    crossingBlocks++;
                }
            }
        });

        const isMultiColumn = (crossingBlocks / totalSignificantBlocks) < 0.4;

        return isMultiColumn 
        ? { score: 75, pros: [], cons: ["Multi-column layout detected. Use a single-column format for better ATS compatibility."] }
        : { score: 100, pros: ["Single-column layout detected."], cons: [] };
    }
}