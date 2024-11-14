import Navbar from '@/components/Navbar';
import PlanSection from '@/app/_components/sections/PlanSection';

export default function Component() {
    const terms = [
        {
            name: 'Winter 2025',
            courses: [
                { code: 'CS 361', title: 'Software Engineering I' },
                { code: 'CS 290', title: 'Web Development' },
                { code: 'CS 325', title: 'Analysis of Algorithms' },
                { code: 'CS 340', title: 'Intro To Databases' },
            ],
        },
        {
            name: 'Spring 2025',
            courses: [
                { code: 'CS 362', title: 'Software Engineering II' },
                {
                    code: 'CS 499',
                    title: 'Special Topics - Probabilistic and Causal Inference',
                },
                {
                    code: 'CS 162',
                    title: 'Introduction to Computer Science II',
                },
                { code: 'CS 340', title: 'Intro To Databases' },
            ],
        },
        {
            name: 'Summer 2025',
            courses: [
                { code: 'CS 361', title: 'Software Engineering I' },
                { code: 'CS 290', title: 'Web Development' },
                { code: 'CS 325', title: 'Analysis of Algorithms' },
                { code: 'CS 340', title: 'Intro To Databases' },
            ],
        },
        {
            name: 'Fall 2025',
            courses: [
                { code: 'CS 362', title: 'Software Engineering II' },
                {
                    code: 'CS 499',
                    title: 'Special Topics - Probabilistic and Causal Inference',
                },
                {
                    code: 'CS 162',
                    title: 'Introduction to Computer Science II',
                },
                { code: 'CS 340', title: 'Intro To Databases' },
            ],
        },
        {
            name: 'Winter 2026',
            courses: [
                { code: 'CS 361', title: 'Software Engineering I' },
                { code: 'CS 290', title: 'Web Development' },
                { code: 'CS 325', title: 'Analysis of Algorithms' },
                { code: 'CS 340', title: 'Intro To Databases' },
            ],
        },
    ];

    return (
        <div className="flex min-h-screen w-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto p-3 sm:p-6">
                    <div className="flex flex-col w-full">
                        <PlanSection terms={terms} />
                    </div>
                </div>
            </main>
        </div>
    );
}
