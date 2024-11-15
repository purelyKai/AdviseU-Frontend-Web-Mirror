'use client';

import { Button } from '@/components/ui/button';
import { useTermsStore } from '../store';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { Course, Term } from '@/lib/types';

import SearchCourseCard from './SearchCourseCard';
import { useState } from 'react';
import mockCourses from '@/app/mockdata/courses.json';

interface AddCourseButtonProps {
    term: Term;
}

const AddCourseButton: React.FC<AddCourseButtonProps> = ({ term }) => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const { addCourseToTerm } = useTermsStore();

    const handleCourseSubmit = () => {
        if (!selectedCourse) return;

        addCourseToTerm(term, selectedCourse);
        setSelectedCourse(null);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center">
                    <h3>Add Course</h3>
                    <PlusIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Course</DialogTitle>
                <SearchCourseCard
                    availableCourses={mockCourses}
                    setSelectedCourse={setSelectedCourse}
                    selectedCourse={selectedCourse}
                    term={term}
                />
                <DialogClose asChild>
                    <Button disabled={selectedCourse === null} variant="default" onClick={handleCourseSubmit}>
                        Add Course
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default AddCourseButton;
