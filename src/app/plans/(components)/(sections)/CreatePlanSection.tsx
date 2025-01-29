'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Sparkles } from 'lucide-react';
import { usePlansStore } from '@/app/store';

interface Plan {
    id: number;
    name: string;
    description: string;
}

interface DegreeProgress {
    overallProgress: number;
    missingClasses: string[];
    recommendedClasses: string[];
}

const CreatePlanSection = () => {
    const { plans, addPlan } = usePlansStore();
    const [newPlan, setNewPlan] = useState<Plan>({ name: '', description: '', id: plans.length });

    const handleCreatePlan = () => {
        if (newPlan.name.trim() === '') return;
        const id = plans.length + 1;
        addPlan({ ...newPlan, id });
        setNewPlan({ name: '', description: '', id });
    };
    
    return (
        <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 text-orange-500" />
                    Create New Plan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4">
                    <Input
                        placeholder="Plan Name"
                        value={newPlan.name}
                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    />
                    <Textarea
                        placeholder="Plan Description"
                        value={newPlan.description}
                        onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    />
                    <Button onClick={handleCreatePlan} className="w-full bg-orange-500 hover:bg-orange-600">
                        <Plus className="mr-2 h-4 w-4" /> Create Plan
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CreatePlanSection;
