import Navbar from '@/components/Navbar';
import PlanSection from '@/app/sections/PlanSection';

export default function Component() {
    return (
        <div className="flex min-h-screen w-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto p-3 sm:p-6">
                    <div className="flex flex-col w-full">
                        <PlanSection />
                    </div>
                </div>
            </main>
        </div>
    );
}
