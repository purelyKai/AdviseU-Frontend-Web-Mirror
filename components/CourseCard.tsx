import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Course } from '@/lib/types';
import { EllipsisVertical } from 'lucide-react';

interface CourseCardProps {
    course: Course;
    courseIndex: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, courseIndex }) => {
    return (
        <div
            key={courseIndex}
            className="flex items-center justify-between rounded-lg border p-2 shadow-sm bg-white sm:p-3"
        >
            <div>
                <div className="text-sm font-medium sm:text-md">{course.code}</div>
                <div className="text-xs text-muted-foreground line-clamp-1 sm:text-sm">{course.title}</div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <EllipsisVertical />
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
