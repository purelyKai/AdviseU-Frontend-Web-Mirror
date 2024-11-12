'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { Course } from '@/lib/types';
import SearchContainer from './SearchCourseCard';
import { useState } from 'react';

const availableCourses = Array(8).fill({
    code: 'CS 290',
    title: 'Web Development',
});

const AddCourseButton = () => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const handleAddCourse = () => {
        // TODO: Add course to plan
        console.log(selectedCourse);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <PlusIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Course</DialogTitle>
                <SearchContainer availableCourses={availableCourses} />
                <DialogClose asChild>
                    <Button variant="default" onClick={handleAddCourse}>
                        Add Course
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default AddCourseButton;
