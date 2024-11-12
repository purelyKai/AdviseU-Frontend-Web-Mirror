import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Course } from '@/lib/types';

interface CourseCardProps {
    course: Course;
    courseIndex: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, courseIndex }) => {
    return (
        <div key={courseIndex} className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
            <div>
                <div className="font-medium">{course.code}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">{course.title}</div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Remove course</DropdownMenuItem>
                    <DropdownMenuItem>Move to another term</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default CourseCard;
