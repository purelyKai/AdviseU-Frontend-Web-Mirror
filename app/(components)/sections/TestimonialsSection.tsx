import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Computer Science Major',
        content:
            "AdviseU has been a game-changer for my academic planning. It's so intuitive and has saved me countless hours of stress!",
    },
    {
        name: 'Michael Lee',
        role: 'Business Administration Student',
        content:
            "I love how AdviseU helps me visualize my degree progress. It's made it so much easier to stay on track and plan for the future.",
    },
    {
        name: 'Emily Rodriguez',
        role: 'Environmental Sciences Undergraduate',
        content:
            "The course recommendations from AdviseU are spot-on! It's like having a personal academic advisor at my fingertips.",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="bg-gray-100">
            <div className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold mb-12 text-center text-black">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <CardContent className="p-6">
                                <p className="text-gray-600 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                                <div className="font-semibold">{testimonial.name}</div>
                                <div className="text-sm text-gray-500">{testimonial.role}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
