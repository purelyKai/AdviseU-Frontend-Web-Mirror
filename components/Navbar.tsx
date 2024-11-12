import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Shell } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <header className="container mx-auto flex h-14 items-center">
            {/* Large screen sizes */}
            <div className="mr-4 hidden md:flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                    {/* TODO: Replace Shell with AdviseU Logo */}
                    <Shell />
                    <span className="hidden font-bold sm:inline-block">AdviseU</span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/courses">
                        Courses
                    </a>
                    <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/plan">
                        Your Plan
                    </a>
                    <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/profile">
                        Profile
                    </a>
                </nav>
            </div>

            {/* Small screen sizes */}
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </div>
        </header>
    );
};

export default Navbar;
