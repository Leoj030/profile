import BgBadge from "../../ui/BgBadge";
import { Users } from "lucide-react";
import { Card, CardDescription, CardIcon, CardTitle } from "../../ui/card";

export default function ApplicantFeatures() {
    return (
        <section className="flex flex-col items-center">
            <BgBadge
                icon={<Users className="w-4 h-4 text-white" />}
                iconClassName="bg-gradient-to-r from-blue-500 to-cyan-500"
                badgeClassName="bg-blue-500/10 border-blue-500/50"
                textClassName="text-blue-900 dark:text-blue-200"
            >
                Individual Evaluation
            </BgBadge>
        </section>
    );
}
