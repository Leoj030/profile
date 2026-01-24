import { Mail, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-blue-200/20 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 justify-between">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                    <span className="font-medium font-[Montserrat_Alternates]">ProFile</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                    AI-powered resume evaluation to help you land your dream job. 
                    Get instant feedback and improve your chances of success.
                    </p>
                    <div className="flex gap-2">
                        
                    </div>
                </div>
            
                <section className="flex items-center w-full gap-7">
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold">Products</h4>
                        <ul className="space-y-2 text-gray-400 text-[15px] flex flex-col items-center">
                        <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                        </ul>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold">Resources</h4>
                        <ul className="space-y-2 text-gray-400 text-[15px] flex flex-col items-center">
                        <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Resume Tips</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Career Guide</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Templates</a></li>
                        </ul>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold">The Team</h4>
                        <ul className="space-y-2 text-gray-400 text-[15px] flex flex-col items-center">
                        <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                        <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </section>
            </div>
            
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ProFile. All rights reserved.</p>
            </div>
        </div>
    </footer>
    );
}