//import { useEffect } from 'react';
import { Params, SearchParams } from '@/lib/types';
import { motion } from 'framer-motion';
import { useTermsStore } from '@/app/store';
import populatedTerms from '@/mockdata/populatedTerms.json';
import { Card } from '@/components/ui/card';

import CourseSearchSection from './(components)/(sections)/CourseSearchSection';
import PlanOverviewSection from './(components)/(sections)/PlanOverviewSection';

const Page = async ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
    const planId = Number((await params).planId);
    const { initTerms } = useTermsStore();

    // useEffect(() => {
    //     initTerms(populatedTerms);
    // }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center gap-12 px-10 max-w-full min-h-[94vh] bg-gradient-to-br from-orange-100 to-blue-100"
        >
            <div>
                <h1 className="text-4xl text-center font-bold text-orange-600 mb-2">My Degree Plan</h1>
                <p className="text-lg text-center text-gray-600">Plan ID: {planId}</p>
            </div>

            <Card className="flex gap-5 w-full bg-transparent">
                <PlanOverviewSection />
                <CourseSearchSection />
            </Card>
        </motion.div>
    );
};

export default Page;
