import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Course } from '@/lib/types';

interface SearchContainerProps {
    availableCourses: Course[];
}

// TODO: Implement search functionality, pagination, and course selection
const SearchContainer: React.FC<SearchContainerProps> = ({ availableCourses }) => {
    return (
        <Card className="p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-8" placeholder="Search courses..." type="search" />
            </div>

            {/* Course Search Results Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
                {availableCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div>
                            <div className="font-medium">{course.code}</div>
                            <div className="text-sm text-muted-foreground">{course.title}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-1">
                <Button variant="outline" className="h-8 w-8 p-0" disabled>
                    1
                </Button>
                {[2, 3, 4, 5].map((page) => (
                    <Button key={page} variant="ghost" className="h-8 w-8 p-0">
                        {page}
                    </Button>
                ))}
            </div>
        </Card>
    );
};

export default SearchContainer;
