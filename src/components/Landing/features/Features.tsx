import DottedBadge from "../../ui/DottedBadge";
import FeatureToggle from "./FeatureToggle";

export default function Features() {
    return (
        <section className="relative w-full flex justify-center">
            <section className="absolute inset-0 z-0 overflow-hidden">
                <span className="block absolute bg-linear-to-r from-purple-400/30 to-pink-400/30 blur-xl dark:blur-3xl h-35 w-35 rounded-full bottom-0 right-0 translate-x-1/2"></span>
                <span className="block absolute bg-linear-to-r from-indigo-400/30 to-purple-400/30 blur-xl h-35 w-35 rounded-full top-16 left-20 -translate-x-1/2"></span>
            </section>

            <section className="relative z-10 flex flex-col items-center pt-20 px-6">
                <DottedBadge>Dual-Purpose AI Platform</DottedBadge>

                <h1 className="text-main text-[35px] font-bold text-center">
                    Built For{" "}
                    <span className="text-transparent bg-clip-text bg-main-gradient">
                        Everyone
                    </span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-[17px] leading-relaxed text-center mt-5">
                    Whether you&apos;re a job seeker looking to improve your
                    resume or a business needing automated screening, our
                    AI-powered platform scales to meet your needs.
                </p>
                <FeatureToggle />
            </section>
        </section>
    );
}
