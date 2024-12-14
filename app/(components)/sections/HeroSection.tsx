'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const catchyWords = ['simpler', 'easier', 'faster', 'better'];

export default function HeroSection() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const wordInterval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentWordIndex((prevIndex) => (prevIndex + 1) % catchyWords.length);
                setIsAnimating(false);
            }, 500); // Half of the transition time
        }, 3000);

        return () => clearInterval(wordInterval);
    }, []);

    return (
        <section className="bg-gray-100 relative overflow-hidden py-20">
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-5xl font-bold mb-6 text-black">
                    Make degree-planning{' '}
                    <span
                        className={`inline-block min-w-[120px] text-orange-600 font-bold transition-all duration-500 ${
                            isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                        }`}
                    >
                        {catchyWords[currentWordIndex]}
                    </span>
                </h1>
                <p className="text-xl mb-8 text-gray-700">Plan your academic journey with ease and precision</p>
                <Button
                    size="lg"
                    className="bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:bg-orange-700 hover:-translate-y-0.5 hover:shadow-lg"
                    asChild
                >
                    <Link href="/plans">Get Started</Link>
                </Button>
            </div>
        </section>
    );
}
