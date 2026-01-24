import BgBadge from "../../ui/BgBadge";
import { Settings } from "lucide-react";

export default function RecruiterFeatures() {
    return (
        <section className="flex flex-col items-center">
            <BgBadge
                icon={<Settings className="w-4 h-4 text-white" />}
                iconClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                badgeClassName="bg-pink-500/10 border-pink-500/50"
                textClassName="text-pink-900 dark:text-pink-200"
            >
                Automate Screening
            </BgBadge>
        </section>
    );
}
