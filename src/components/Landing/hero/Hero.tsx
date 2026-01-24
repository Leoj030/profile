import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import { Users, TrendingUp, Star } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative flex justify-center hero">
            <section className="absolute inset-0 z-0 overflow-hidden">
                <span className="block absolute bg-linear-to-r from-purple-400/50 to-pink-400/50 dark:from-purple-400/30 dark:to-pink-400/30 blur-xl dark:blur-3xl h-50 w-50 lg:h-100 lg:w-100 rounded-full top-16 left-0 -translate-x-1/2 animate-pulse"></span>
                <span className="block absolute bg-linear-to-r from-indigo-400/30 to-purple-400/30 dark:from-indigo-400/20 dark:to-purple-400/20 blur-xl dark:blur-3xl h-50 w-50 lg:h-100 lg:w-100 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></span>
                <span className="block absolute bg-linear-to-r from-blue-400/50 to-cyan-400/50 dark:from-blue-400/30 dark:to-cyan-400/30 blur-xl dark:blur-3xl h-50 w-50 lg:h-100 lg:w-100 rounded-full bottom-0 right-0 translate-x-1/2 animate-pulse"></span>
            </section>

            <section className="relative z-10 flex flex-col items-center pt-36 px-6 lg:pt-66">
                <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight flex flex-col items-center hero-animation">
                    <span className=" text-slate-900 dark:text-slate-100 text-center">
                        Where AI Meets{" "}
                        <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                            Careers
                        </span>
                    </span>
                    <span className="block text-slate-900 dark:text-slate-100 text-center">
                        Smarter Resumes & Smarter Hiring
                    </span>
                </h1>
                <p className="text-center my-4 text-gray-400 font-medium lg:text-2xl lg:mb-15 hero-animation-delay-1">
                    From resume creation to AI screening — everything you need
                    for smarter hiring and career growth
                </p>

                <div className="flex flex-col items-center w-full md:justify-center md:flex-row md:gap-5">
                    <Link href="/resume-evaluation">
                        <Button
                            variant="primary"
                            className=" h-13 lg:h-15 w-full mt-5 text-lg lg:text-xl rounded-xl md:w-xs cursor-pointer hero-animation-delay-btn1"
                        >
                            Create Your Resume
                        </Button>
                    </Link>
                    <Link href="/resume-evaluation">
                        <Button
                            variant="outline"
                            className="h-13 lg:h-15 w-full mt-5 text-lg lg:text-xl rounded-xl cursor-pointer md:w-xs hero-animation-delay-btn2"
                            /*onClick={clickHandler}*/
                        >
                            Get Your Resume Evaluated
                        </Button>
                    </Link>
                </div>

                <br />

                <div className="md:flex md:gap-20 md:mt-10">
                    <div className="hero-animation-delay-badge1">
                        <Badge
                            icon={<Users className="h-6 w-6 text-white" />}
                            title="Free"
                            description="Free Analysis"
                            className="bg-linear-to-r from-green-500 to-emerald-500"
                        />
                    </div>

                    <div className="hero-animation-delay-badge2">
                        <Badge
                            icon={<TrendingUp className="h-6 w-6 text-white" />}
                            title="40%"
                            description="Avg. Improvement"
                            className="bg-linear-to-r from-blue-500 to-cyan-500"
                        />
                    </div>

                    <div className="hero-animation-delay-badge3">
                        <Badge
                            icon={<Star className="h-6 w-6 text-white" />}
                            title="4.3"
                            description="User Rating"
                            className="bg-linear-to-r from-yellow-500 to-orange-500"
                        />
                    </div>
                </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </section>
        </section>
    );
}
