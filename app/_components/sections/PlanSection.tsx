import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CourseCard from '../../../components/CourseCard';
import { Trash } from 'lucide-react';
import AddCourseButton from '../AddCourseButton';
import { Term } from '@/lib/types';

interface PlanSectionProps {
    terms: Term[];
}

const PlanSection: React.FC<PlanSectionProps> = ({ terms }) => {
    return (
        <Card className="flex justify-start items-center gap-5 p-6 h-[60vh]">
            {terms.map((term, termIndex) => (
                <div key={termIndex} className="flex flex-col w-[25%] gap-3">
                    {/* Term Header */}
                    <div className="flex justify-between items-center gap-3 px-3">
                        <h1 className="text-xl font-bold">{term.name}</h1>
                        <div className="flex gap-2">
                            <AddCourseButton />
                            <Button variant="outline" size="icon">
                                <Trash />
                            </Button>
                        </div>
                    </div>

                    {/* Term Courses */}
                    {term.courses.map((course, courseIndex) => (
                        <CourseCard course={course} courseIndex={courseIndex} key={courseIndex} />
                    ))}
                </div>
            ))}
        </Card>
    );
};

export default PlanSection;
