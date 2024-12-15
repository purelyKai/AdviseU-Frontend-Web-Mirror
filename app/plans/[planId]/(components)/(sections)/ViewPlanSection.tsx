'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import { useTermsStore } from '@/app/store';
import populatedTerms from '@/mockdata/populatedTerms.json';
import { Course, Term } from '@/lib/types';
import { X } from 'lucide-react';
import { useFetchCourses } from '@/hooks/queries/useFetchCourses';
import { Skeleton } from '@/components/ui/skeleton';

interface ViewPlanSectionProps {
    planId: number;
}

const ViewPlanSection: React.FC<ViewPlanSectionProps> = ({ planId }) => {
    const { terms, initTerms, removeTerm, addCourseToTerm } = useTermsStore();
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, isFetching } = useFetchCourses(searchQuery);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    const timeoutRef = useRef();

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setSearchQuery(search);
        }, 500);

        return () => clearTimeout(timeoutRef.current);
    }, [search]);

    useEffect(() => {
        initTerms(populatedTerms);
    }, []);

    const handleAddCourse = () => {
        if (selectedCourse && selectedTerm) {
            addCourseToTerm(selectedTerm, selectedCourse);

            // Reset search form fields
            setSelectedCourse(null);
            setSelectedTerm(null);
        }
    };

    const handleDeleteTerm = (termToDelete: Term) => {
        removeTerm(termToDelete);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center gap-8 px-10 max-w-full min-h-screen bg-gradient-to-br from-orange-100 to-blue-100"
        >
            <motion.div
                className="text-center"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <h1 className="text-4xl font-bold text-orange-600 mb-2">My Degree Plan</h1>
                <p className="text-lg text-gray-600">Plan ID: {planId}</p>
            </motion.div>

            <Card className="flex flex-col items-center gap-6 p-6 w-full bg-white/80 backdrop-blur-sm shadow-xl rounded-xl">
                <motion.div
                    className="w-full max-w-2xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="flex flex-col gap-4 mb-6">
                        <h2 className="text-2xl font-semibold text-orange-600">Add Courses to Your Plan</h2>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search for courses..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pr-10"
                            />
                            <Button
                                variant="ghost"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => setSearch('')}
                            >
                                <X size={16} />
                            </Button>
                        </div>
                        {search && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col bg-white p-4 gap-2 rounded-md shadow-md max-h-60 overflow-y-auto"
                            >
                                {search != searchQuery || isLoading ? (
                                    <>
                                        <Skeleton className="h-16 p-1 rounded-md bg-gray-50" />
                                        <Skeleton className="h-16 p-1 rounded-md bg-gray-50" />
                                        <Skeleton className="h-16 rounded-md bg-gray-50" />
                                        <Skeleton className="h-16 rounded-md bg-gray-50" />
                                    </>
                                ) : (
                                    data.map((course: Course, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            className={`p-2 cursor-pointer rounded-md ${
                                                selectedCourse === course
                                                    ? 'bg-orange-100'
                                                    : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                            onClick={() => setSelectedCourse(course)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <p className="font-semibold">{course.course_number}</p>
                                            <p className="text-sm text-gray-600">{course.course_name}</p>
                                        </motion.div>
                                    ))
                                )}
                            </motion.div>
                        )}
                    </div>
                    {selectedCourse && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Select a term to add {selectedCourse.course_number}:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {terms.map((term) => (
                                    <Button
                                        key={term.name}
                                        variant={selectedTerm === term ? 'default' : 'outline'}
                                        onClick={() => setSelectedTerm(term)}
                                    >
                                        {term.name}
                                    </Button>
                                ))}
                            </div>
                            <Button className="mt-4" onClick={handleAddCourse} disabled={!selectedTerm}>
                                Add Course to Plan
                            </Button>
                        </motion.div>
                    )}
                </motion.div>

                <div ref={carouselRef} className="w-full overflow-x-auto flex">
                    <motion.div
                        className="flex"
                        animate={controls}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <AnimatePresence>
                            {terms.map((term, termIndex) => (
                                <motion.div
                                    key={termIndex}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex-shrink-0 snap-center ${
                                        termIndex === Math.floor(terms.length / 2) ? 'w-[400px]' : 'w-[300px]'
                                    } bg-white p-6 rounded-lg shadow-md mx-2`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-orange-600">{term.name}</h2>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteTerm(term)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </Button>
                                    </div>
                                    <AnimatePresence>
                                        {term.courses.map((course, courseIndex) => (
                                            <motion.div
                                                key={courseIndex}
                                                initial={{ x: -50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: 50, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <CourseCard
                                                    course={course}
                                                    courseIndex={courseIndex}
                                                    term={term}
                                                    displayOptions
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </Card>
        </motion.div>
    );
};

export default ViewPlanSection;
