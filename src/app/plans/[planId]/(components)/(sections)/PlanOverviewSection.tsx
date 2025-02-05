'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useTermsStore } from '@/app/store';
import populatedTerms from '@/mockdata/populatedTerms.json';
import TermCard from '../TermCard';

const PlanOverviewSection = () => {
    const { terms, initTerms } = useTermsStore();
    const controls = useAnimation();

    useEffect(() => {
        initTerms(populatedTerms);
    }, []);

    return (
        <div className="w-full overflow-x-auto flex flex-col p-8 gap-3 bg-white/80 backdrop-blur-sm shadow-xl rounded-xl">
            <h1 className="text-xl ml-2 font-bold">Plan Overview</h1>
            <motion.div
                className="flex gap-3"
                animate={controls}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <AnimatePresence>
                    {terms.map((term, termIndex) => (
                        <TermCard key={termIndex} term={term} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PlanOverviewSection;
