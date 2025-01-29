'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DegreeProgress {
    overallProgress: number;
    missingClasses: string[];
}

const DegreeProgressSection = () => {
    const [progress, setProgress] = useState(0);

    const degreeProgress: DegreeProgress = {
        overallProgress: 65,
        missingClasses: ['CS 374', 'CS 325', 'CS 494'],
    };

    useEffect(() => {
        const timer = setTimeout(() => setProgress(degreeProgress.overallProgress), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-orange-600">Degree Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <div className="flex justify-between mb-2">
                        <span>Overall Progress</span>
                        <span className="font-bold text-orange-600">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-orange-100">
                        <div
                            className="h-full bg-orange-500 transition-all duration-500 ease-in-out"
                            style={{ width: `${progress}%` }}
                        />
                    </Progress>
                </div>
                <div>
                    <h3 className="font-semibold mb-2 text-orange-600">Missing Classes</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {degreeProgress.missingClasses.map((cls, index) => (
                            <li key={index}>{cls}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default DegreeProgressSection;
