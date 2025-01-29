'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import { useTermsStore } from '@/app/store';
import populatedTerms from '@/mockdata/populatedTerms.json';
import { X } from 'lucide-react';

const PlanOverviewSection = () => {
    const { terms, removeTerm, initTerms } = useTermsStore();
    const controls = useAnimation();

    useEffect(() => {
        initTerms(populatedTerms);
    }, []);

    return (
        <div className="w-full overflow-x-auto flex flex-col p-8 gap-3 bg-white/80 backdrop-blur-sm shadow-xl rounded-xl">
            <h1 className="text-2xl ml-2 font-bold">Plan Overview</h1>
            <motion.div
                className="flex gap-3"
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
                            className={`flex-shrink min-w-72 max-w-sm bg-white p-6 m-2 rounded-lg outline outline-gray-200 shadow-md`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold text-orange-600">{term.name}</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTerm(term)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <AnimatePresence>
                                    {term.courses.map((course, courseIndex) => (
                                        <motion.div
                                            key={courseIndex}
                                            initial={{ x: -50, opacity: 1 }}
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
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PlanOverviewSection;
