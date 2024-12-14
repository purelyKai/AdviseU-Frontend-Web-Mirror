import HeroSection from './(components)/sections/HeroSection';
import VideoDemoSection from './(components)/sections/VideoDemoSection';
import FeaturesSection from './(components)/sections/FeaturesSection';
import AboutSection from './(components)/sections/AboutSection';
import TestimonialsSection from './(components)/sections/TestimonialsSection';
import Footer from '@/components/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <main>
                <HeroSection />
                <VideoDemoSection />
                <FeaturesSection />
                <AboutSection />
                <TestimonialsSection />
            </main>
            <Footer />
        </div>
    );
}
