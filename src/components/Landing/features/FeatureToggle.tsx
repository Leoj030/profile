"use client";

import { Users, Settings } from "lucide-react";
import { useState } from "react";
import BgBadge from "../../ui/BgBadge";
import ApplicantFeatures from "../features/ApplicantFeatures";
import RecruiterFeatures from "./RecruiterFeatures";

export default function FeatureToggle() {
    const [selectedTab, setSelectedTab] = useState<"left" | "right">("left");

    return (
        <section className="w-full">
            <section className="relative mt-10 mb-10 h-14 w-full bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 flex justify-between items-center overflow-hidden">
                <div
                    aria-label="Toggle switch"
                    className={`absolute left-[2px] h-[calc(100%-4px)] my-[2px] w-[calc(50%-4px)] rounded-[13px] bg-btn-primary text-main font-medium transition-transform duration-300 ease-in-out transform ${selectedTab === "left" ? "translate-x-0" : "translate-x-[calc(100%+4px)]"}`}
                ></div>
                <button
                    className={`relative left-[2px] h-[95%] w-[49%] rounded-xl font-medium ${selectedTab === "left" ? "text-white" : "text-main"} transition-colors duration-300 ease-in-out cursor-pointer`}
                    onClick={() => setSelectedTab("left")}
                >
                    <Users className="inline mb-1 mr-2 w-5 h-5" />
                    Job Seekers
                </button>

                <button
                    className={`relative right-[2px] h-[95%] w-[49%] rounded-xl font-medium ${selectedTab === "right" ? "text-white" : "text-main"} transition-colors duration-300 ease-in-out cursor-pointer`}
                    onClick={() => setSelectedTab("right")}
                >
                    <Settings className="inline mb-1 mr-2 w-5 h-5" />
                    Businesses
                </button>
            </section>

            <section>
                {selectedTab === "left" ? (
                    <ApplicantFeatures />
                ) : (
                    <RecruiterFeatures />
                )}
            </section>
        </section>
    );
}
