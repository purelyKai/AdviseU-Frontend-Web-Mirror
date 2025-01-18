'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import { useTermsStore } from '@/app/store';
import { Course, Term } from '@/lib/types';
import { X } from 'lucide-react';
import { useFetchCourses } from '@/hooks/queries/useFetchCourses';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CourseSearchSection = () => {
    const { terms, addCourseToTerm } = useTermsStore();
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, isFetching } = useFetchCourses(searchQuery);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const handleCancelSearch = () => {
        setSearch('');
        setSelectedCourse(null);
    };
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setSearchQuery(search);
        }, 500);

        return () => clearTimeout(timeoutRef.current);
    }, [search]);

    const handleAddCourse = () => {
        if (selectedCourse && selectedTerm) {
            addCourseToTerm(selectedTerm, selectedCourse);

            // Reset search form fields
            setSelectedCourse(null);
            setSelectedTerm(null);
        }
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setSelectedCourse(null);
    };
    return (
        <motion.div
            className="w-full max-w-sm p-8 gap-2 bg-white/80 backdrop-blur-sm shadow-xl rounded-xl"
            initial={{ y: 20, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.25 }}
        >
            <div className="flex flex-col gap-2 mb-6">
                <h1 className="text-xl text-center font-bold">Search for courses</h1>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search for courses..."
                        value={search}
                        onChange={handleChangeSearch}
                        className="pr-10 bg-white/90"
                    />
                    <Button
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={handleCancelSearch}
                    >
                        <X size={16} />
                    </Button>
                </div>
                {search && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col bg-white p-4 gap-3 rounded-md shadow-md max-h-60 overflow-y-auto outline outline-gray-200"
                    >
                        {search != searchQuery || isLoading ? (
                            <>
                                <Skeleton className="h-16 p-1 rounded-md bg-gray-100" />
                                <Skeleton className="h-16 p-1 rounded-md bg-gray-100" />
                                <Skeleton className="h-16 p-1 rounded-md bg-gray-100" />
                                <Skeleton className="h-16 p-1 rounded-md bg-gray-100" />
                            </>
                        ) : (
                            data?.map((course: Course, idx: number) => (
                                <motion.div
                                    key={idx}
                                    className={`p-[2px] cursor-pointer rounded-md ${
                                        selectedCourse === course ? 'bg-orange-700' : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => setSelectedCourse(course)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <CourseCard course={course} />
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
                {search && selectedCourse && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                            Select a term to add {selectedCourse.course_number}:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <Select
                                onValueChange={(term) => setSelectedTerm(terms.find((t) => t.name === term) || null)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a term..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {terms.map((term, idx) => (
                                        <SelectItem
                                            key={idx}
                                            value={term.name}
                                            onClick={() => setSelectedTerm(term)}
                                            className="cursor-pointer hover:bg-gray-100"
                                        >
                                            {term.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="mt-4" onClick={handleAddCourse} disabled={!selectedTerm || !selectedCourse}>
                            Add Course to Plan
                        </Button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default CourseSearchSection;
