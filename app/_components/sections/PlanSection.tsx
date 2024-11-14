import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CourseCard from '../../../components/CourseCard';
import { Edit, Ellipsis, Plus, PlusIcon, Trash } from 'lucide-react';
import { Term } from '@/lib/types';

interface PlanSectionProps {
    terms: Term[];
}

const PlanSection: React.FC<PlanSectionProps> = ({ terms }) => {
    return (
        <Card className="flex flex-col justify-center items-center gap-4 px-3 py-4 xss:w-full">
            <div className="flex flex-col justify-between items-center gap-3 w-full xs:w-[95%]">
                <div className="flex justify-between items-center w-full px-4">
                    <h1 className="text-xl font-bold xs:text-2xl">My Plan</h1>
                    <div className="flex gap-4">
                        <Button variant="outline">
                            <h3 className="hidden xs:block">Edit Terms</h3>
                            <Edit />
                        </Button>
                        <Button>
                            <h3 className="hidden xs:block">Add Term</h3>
                            <PlusIcon />
                        </Button>
                    </div>
                </div>
                <hr className=" border-t-[1px] border-gray-500 my-1 w-full" />
            </div>
            <div className="flex justify-start items-center overflow-auto w-full xs:gap-5">
                {terms.map((term, termIndex) => (
                    <div key={termIndex} className="flex flex-col gap-2 min-w-[250px] rounded-lg p-4 md:min-w-[320px]">
                        {/* Term Header */}
                        <h1 className="text-md font-bold xs:text-lg">{term.name}</h1>

                        {/* Term Courses */}
                        {term.courses.map((course, courseIndex) => (
                            <CourseCard course={course} courseIndex={courseIndex} key={courseIndex} />
                        ))}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default PlanSection;
