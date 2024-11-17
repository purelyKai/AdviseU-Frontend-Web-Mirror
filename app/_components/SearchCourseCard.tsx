import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Course, Term } from '@/lib/types';
import CourseCard from '@/components/CourseCard';

interface SearchCourseCardProps {
    term: Term;
    availableCourses: Course[];
    setSelectedCourse: React.Dispatch<React.SetStateAction<Course | null>>;
    selectedCourse: Course | null;
}

// TODO: Implement search functionality and pagination
const SearchCourseCard: React.FC<SearchCourseCardProps> = ({
    term,
    availableCourses,
    setSelectedCourse,
    selectedCourse,
}) => {
    return (
        <Card className="p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-8" placeholder="Search courses..." type="search" />
            </div>

            {/* Course Search Results Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
                {availableCourses.map((course, index) => {
                    // Ignore courses that are already in the term
                    if (term.courses.find((c) => c.course_number === course.course_number)) return null;

                    return (
                        <CourseCard
                            selected={selectedCourse === course}
                            selectable
                            course={course}
                            onClick={() => setSelectedCourse(course)}
                            key={index}
                            term={term}
                        />
                    );
                })}
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

export default SearchCourseCard;
