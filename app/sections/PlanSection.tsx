'use client';

import { Card } from '@/components/ui/card';
import CourseCard from '../../components/CourseCard';
import EditPlanButton from '../_components/RemoveTermsButton';
import { useTermsStore } from '@/app/store';
import populatedTerms from '@/app/mockdata/populatedTerms.json';
import { useEffect } from 'react';
import AddTermButton from '../_components/AddTermsButton';
import AddCourseButton from '../_components/AddCourseButton';

const PlanSection: React.FC = () => {
    const { terms, initTerms } = useTermsStore();

    useEffect(() => {
        initTerms(populatedTerms);
    }, []);

    return (
        <Card className="flex flex-col justify-center items-center gap-4 px-3 py-4 xss:w-full">
            {/* Plan Header */}
            <div className="flex flex-col justify-between items-center gap-3 w-full xs:w-[95%]">
                <div className="flex justify-between items-center w-full px-4">
                    <h1 className="text-xl font-bold xs:text-2xl">My Plan</h1>
                    <div className="flex gap-4">
                        <EditPlanButton />
                        <AddTermButton />
                    </div>
                </div>
                <hr className=" border-t-[1px] border-gray-500 my-1 w-full" />
            </div>

            {/* Terms */}
            <div className="flex justify-start items-start overflow-auto w-full xs:gap-5">
                {terms.map((term, termIndex) => (
                    <div key={termIndex} className="flex flex-col gap-2 min-w-[250px] rounded-lg p-4 md:min-w-[320px]">
                        {/* Term Header */}
                        <h1 className="text-md font-bold xs:text-lg">{term.name}</h1>

                        {/* Term Courses */}
                        {term.courses.map((course, courseIndex) => (
                            <CourseCard
                                course={course}
                                courseIndex={courseIndex}
                                key={courseIndex}
                                term={term}
                                displayOptions
                            />
                        ))}
                        <AddCourseButton term={term} />
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default PlanSection;
