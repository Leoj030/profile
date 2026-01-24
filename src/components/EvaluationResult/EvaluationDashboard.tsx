"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    ChevronDown,
    ChevronUp,
    AlertTriangle,
    CheckCircle,
    XCircle,
} from "lucide-react";

export interface AnalysisSection {
    score: number;
    summary?: string;
    workingWell: string[];
    improvements: string[];
}

export interface IResultObject {
    content: AnalysisSection;
    grammar: AnalysisSection;
    skills: AnalysisSection;
    atsSemantic: AnalysisSection;
    atsLayout: AnalysisSection;
}

interface EvaluationDashboardProps {
    result: IResultObject;
    resumeImageUrl: string;
    duration: number;
}

const ScoreBadge = ({ score }: { score: number }) => {
    let label = "Needs Work";
    let colorClass = "bg-yellow-500 text-white";

    if (score >= 80) {
        label = "Great Job";
        colorClass = "bg-green-500 text-white";
    } else if (score >= 50) {
        label = "Good Start";
        colorClass = "bg-blue-500 text-white";
    }

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${colorClass}`}
        >
            {label}
        </span>
    );
};

const CircularProgress = ({ score }: { score: number }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    // Color based on score
    let strokeColor = "#eab308"; // yellow-500
    if (score >= 80) strokeColor = "#22c55e"; // green-500
    if (score >= 50 && score < 80) strokeColor = "#eab308"; // yellow/orange for mid
    if (score < 50) strokeColor = "#f97316"; // orange-500

    return (
        <div className="relative flex items-center justify-center w-40 h-40">
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="#f3f4f4"
                    strokeWidth="7"
                    fill="transparent"
                />
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke={strokeColor}
                    strokeWidth="7"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center -translate-y-0.5">
                <span
                    className={`text-4xl font-bold`}
                    style={{ color: strokeColor }}
                >
                    {score}
                </span>
            </div>
        </div>
    );
};

const SectionItem = ({
    title,
    data,
    isOpen,
    toggle,
    className = "",
}: {
    title: string;
    data: AnalysisSection;
    isOpen: boolean;
    toggle: () => void;
    className?: string;
}) => {
    return (
        <div
            className={`bg-white dark:bg-white/10 rounded-xl shadow-sm border border-gray-100 dark:border-gray-100/50 overflow-hidden ${className}`}
        >
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-50/20 transition-colors"
                onClick={toggle}
            >
                <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-main text-lg">{title}</h3>
                    <ScoreBadge score={data.score} />
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-bold text-main text-lg">
                        {data.score}/100
                    </span>
                    {isOpen ? (
                        <ChevronUp className="text-gray-400" />
                    ) : (
                        <ChevronDown className="text-gray-400" />
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-200/20">
                    {data.summary && (
                        <p className="text-base text-gray-500 mb-4 italic">
                            {data.summary}
                        </p>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-2">
                                <CheckCircle size={16} /> What&apos;s Working
                            </h4>
                            <ul className="space-y-1">
                                {data.workingWell?.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="text-sm text-main flex items-start gap-2"
                                    >
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                                {(!data.workingWell ||
                                    data.workingWell.length === 0) && (
                                    <li className="text-sm text-gray-400 italic">
                                        No specific strengths detected.
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-2">
                                <XCircle size={16} /> Areas to Address
                            </h4>
                            <ul className="space-y-1">
                                {data.improvements?.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="text-sm text-main flex items-start gap-2"
                                    >
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                                {(!data.improvements ||
                                    data.improvements.length === 0) && (
                                    <li className="text-sm text-gray-400 italic">
                                        No specific improvements needed.
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function EvaluationDashboard({
    result,
    resumeImageUrl,
}: EvaluationDashboardProps) {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        {},
    );

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    // Calculate Overall Score
    const { content, grammar, skills, atsSemantic, atsLayout } = result;
    const averageScore = Math.round(
        (content.score +
            grammar.score +
            skills.score +
            atsSemantic.score +
            atsLayout.score) /
            5,
    );

    return (
        <div className="min-h-screen p-6 font-sans pt-36">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-600 mb-2">
                        Resume Analysis Complete
                    </h1>
                    <p className="text-gray-500 font-medium">
                        AI-powered evaluation completed
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Resume Image */}
                    <div className="bg-white/40 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-100/50 flex justify-center items-start min-h-[600px]">
                        {/* Mocking a document viewer look */}
                        <div className="w-full h-full relative group">
                            {resumeImageUrl ? (
                                <Image
                                    src={resumeImageUrl}
                                    alt="Resume Preview"
                                    width={800}
                                    height={800}
                                    className="w-full h-auto rounded shadow-sm object-contain"
                                />
                            ) : (
                                <div className="w-full h-96 flex items-center justify-center text-gray-400 bg-gray-100 rounded">
                                    No Resume Image Available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Scores */}
                    <div className="space-y-6">
                        {/* Overall Score Card */}
                        <div className="bg-white dark:bg-white/10 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-100/50 flex flex-col items-center justify-center text-center">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-6">
                                Your Resume Score
                            </h2>
                            <CircularProgress score={averageScore} />
                            <p className="text-gray-400 text-md mt-6">
                                This score is calculated based on the evaluation
                                listed below.
                            </p>
                        </div>

                        {/* Sections */}
                        <div className="space-y-4">
                            <SectionItem
                                title="Content"
                                data={content}
                                isOpen={openSections["content"]}
                                toggle={() => toggleSection("content")}
                            />
                            <SectionItem
                                title="Grammar"
                                data={grammar}
                                isOpen={openSections["grammar"]}
                                toggle={() => toggleSection("grammar")}
                            />
                            <SectionItem
                                title="Skills"
                                data={skills}
                                isOpen={openSections["skills"]}
                                toggle={() => toggleSection("skills")}
                            />
                        </div>

                        {/* ATS Score Card - Recalculated for ATS Layout specifically or kept as summary? 
                The user's original design had a specific ATS card. 
                I will adapt it to share the atsLayout data or atsSemantic, 
                but since we have them as Sections, maybe this card is redundant?
                The user didn't ask to remove it, but the data structure changed.
                I will update it to reflect "ATS Layout" specifically as it seems to match the "Layout" analysis.
            */}
                        <div className="bg-orange-50 dark:bg-orange-950/30 rounded-2xl p-6 border border-orange-100 dark:border-orange-500/20">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-500 rounded-full text-white">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                        ATS Compatibility -{" "}
                                        {Math.round(
                                            (atsSemantic.score +
                                                atsLayout.score) /
                                                2,
                                        )}
                                        /100
                                    </h3>
                                    <ScoreBadge
                                        score={Math.round(
                                            (atsSemantic.score +
                                                atsLayout.score) /
                                                2,
                                        )}
                                    />
                                </div>
                            </div>

                            <p className="text-sm text-orange-800 dark:text-orange-200 mb-6">
                                Scores below 80 in ATS categories indicate your
                                resume might struggle with automated screening
                                systems.
                            </p>

                            <div className="space-y-4">
                                <SectionItem
                                    title="ATS Semantic"
                                    data={atsSemantic}
                                    isOpen={openSections["atsSemantic"]}
                                    toggle={() => toggleSection("atsSemantic")}
                                    className="bg-white/80 dark:bg-orange-900/20 border-orange-200 dark:border-orange-500/20"
                                />
                                <SectionItem
                                    title="ATS Layout"
                                    data={atsLayout}
                                    isOpen={openSections["atsLayout"]}
                                    toggle={() => toggleSection("atsLayout")}
                                    className="bg-white/80 dark:bg-orange-900/20 border-orange-200 dark:border-orange-500/20"
                                />
                            </div>

                            <div className="mt-6 p-3 bg-orange-100 dark:bg-orange-900/40 rounded-lg border border-orange-200 dark:border-orange-500/20 text-xs text-orange-800 dark:text-orange-200 italic">
                                Focus on improving Layout standards and
                                Keywording to boost these scores.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
