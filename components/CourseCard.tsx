import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Course, Term } from '@/lib/types';
import { EllipsisVertical } from 'lucide-react';
import { useTermsStore } from '@/app/store';

interface CourseCardProps {
    term: Term;
    course: Course;
    courseIndex?: number;
    selected?: boolean;
    selectable?: boolean;
    onClick?: () => void;
    displayOptions?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
    term,
    course,
    courseIndex,
    selected,
    selectable,
    onClick,
    displayOptions,
}) => {
    if (!onClick) {
        onClick = () => {};
    }

    const cardVariants = [
        'flex items-center justify-between rounded-lg border p-2 shadow-sm bg-white sm:p-3',
        selected ? 'border-zinc-400 scale-105 bg-zinc-50' : '',
        selectable ? 'cursor-pointer hover:scale-105 hover:border-zinc-400' : '',
    ];

    const { removeCourseFromTerm } = useTermsStore();

    return (
        <div key={courseIndex} className={`${cardVariants.join(' ')}`} onClick={onClick}>
            {/* Course Info */}
            <div>
                <div className="text-sm font-medium sm:text-md">{course.code}</div>
                <div className="text-xs text-muted-foreground line-clamp-1 sm:text-sm">{course.title}</div>
            </div>

            {/* Options */}
            <div className={displayOptions ? '' : 'hidden'}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => removeCourseFromTerm(term, course)}>
                            Remove course
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default CourseCard;
