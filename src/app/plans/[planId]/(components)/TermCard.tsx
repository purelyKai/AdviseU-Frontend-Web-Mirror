'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import { useTermsStore } from '@/app/store';
import { X, MousePointerClick } from 'lucide-react';
import { Term } from '@/lib/types';
import TooltipWrapper from '@/components/TooltipWrapper';

interface TermProps {
    term: Term;
}

const TermCard: React.FC<TermProps> = ({ term }) => {
    const { removeTerm, selectTerm, selectedTerm } = useTermsStore();

    const handleDeleteTerm = (term: Term) => {
        removeTerm(term);

        if (selectedTerm === term) {
            selectTerm(null);
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink min-w-72 max-w-sm bg-white p-6 m-2 transition-all duration-200 rounded-lg shadow-md border-2 ${
                selectedTerm === term ? ' border-orange-400' : ''
            }`}
        >
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-md font-bold text-orange-600">{term.name}</h2>
                <div>
                    <TooltipWrapper tooltipText="Select term">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => selectTerm(term)}
                            className={
                                selectedTerm === term
                                    ? 'text-orange-600 hover:text-orange-600'
                                    : 'hover:text-orange-600'
                            }
                        >
                            <MousePointerClick size={20} />
                        </Button>
                    </TooltipWrapper>

                    <TooltipWrapper tooltipText="Delete term">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTerm(term)}
                            className=" hover:text-red-700"
                        >
                            <X size={20} />
                        </Button>
                    </TooltipWrapper>
                </div>
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
                            <CourseCard course={course} courseIndex={courseIndex} term={term} displayOptions />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default TermCard;
