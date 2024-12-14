import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, BookOpen, TrendingUp } from 'lucide-react';

const features = [
    {
        icon: Calendar,
        title: 'Smart Scheduling',
        description: 'Automatically generate conflict-free schedules based on your preferences and requirements.',
    },
    {
        icon: BookOpen,
        title: 'Course Tracking',
        description: 'Keep track of completed courses, credits, and remaining requirements for your degree.',
    },
    {
        icon: TrendingUp,
        title: 'Progress Insights',
        description: 'Visualize your academic progress and get personalized recommendations for course selection.',
    },
];

export default function FeaturesSection() {
    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold mb-12 text-center text-black">Why Choose AdviseU?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <CardHeader>
                                <feature.icon className="w-12 h-12 text-orange-600 mb-4" />
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
