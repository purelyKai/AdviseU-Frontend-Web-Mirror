'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trash2, Edit, Plus, Sparkles } from 'lucide-react';
import RecommendedClassesSection from './(components)/(sections)/RecommendedClassesSection';

interface Plan {
    id: string;
    name: string;
    description: string;
}

interface DegreeProgress {
    overallProgress: number;
    missingClasses: string[];
    recommendedClasses: string[];
}

export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([
        { id: '1', name: 'Fall 2024 Graduation Plan', description: 'Courses for Fall 2024 Graduation Date' },
        { id: '2', name: 'Spring 2025 Graduation Plan', description: 'Backup plan for Spring 2025 Graduation Date' },
    ]);

    const [newPlan, setNewPlan] = useState<Omit<Plan, 'id'>>({ name: '', description: '' });
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [progress, setProgress] = useState(0);

    const degreeProgress: DegreeProgress = {
        overallProgress: 65,
        missingClasses: ['CS 361', 'CS 362', 'MTH 231'],
        recommendedClasses: ['CS 325', 'CS 340', 'CS 372'],
    };

    useEffect(() => {
        const timer = setTimeout(() => setProgress(degreeProgress.overallProgress), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleCreatePlan = () => {
        if (newPlan.name.trim() === '') return;
        const id = (plans.length + 1).toString();
        setPlans([...plans, { ...newPlan, id }]);
        setNewPlan({ name: '', description: '' });
    };

    const handleUpdatePlan = () => {
        if (!editingPlan || editingPlan.name.trim() === '') return;
        setPlans(plans.map((plan) => (plan.id === editingPlan.id ? editingPlan : plan)));
        setEditingPlan(null);
    };

    const handleDeletePlan = (id: string) => {
        setPlans(plans.filter((plan) => plan.id !== id));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Degree Planning
            </motion.h1>

            <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                    className="md:col-span-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    {/* Create New Plan Section */}
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

                    {/* Plans List */}
                    <AnimatePresence>
                        <div className="grid gap-6 md:grid-cols-2">
                            {plans.map((plan) => (
                                <motion.div
                                    key={plan.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <CardHeader>
                                            <CardTitle>{plan.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                                            <div className="flex justify-between items-center">
                                                <div className="space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => setEditingPlan(plan)}
                                                        className="hover:bg-orange-100"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleDeletePlan(plan.id)}
                                                        className="hover:bg-red-100"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <Link href={`/plans/${plan.id}`}>
                                                    <Button
                                                        variant="secondary"
                                                        className="bg-orange-100 hover:bg-orange-200 text-orange-600"
                                                    >
                                                        View Plan
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    {/* Degree Progress Section */}
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

                    {/* Recommended Classes */}
                    <RecommendedClassesSection classes={degreeProgress.recommendedClasses} />
                </motion.div>
            </div>

            {/* Edit Plan Modal */}
            <AnimatePresence>
                {editingPlan && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1"
                    >
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                            <Card className="w-full max-w-md">
                                <CardHeader>
                                    <CardTitle>Edit Plan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col space-y-4">
                                        <Input
                                            placeholder="Plan Name"
                                            value={editingPlan.name}
                                            onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                                            className="border-orange-200 focus:border-orange-500"
                                        />
                                        <Textarea
                                            placeholder="Plan Description"
                                            value={editingPlan.description}
                                            onChange={(e) =>
                                                setEditingPlan({ ...editingPlan, description: e.target.value })
                                            }
                                            className="border-orange-200 focus:border-orange-500"
                                        />
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" onClick={() => setEditingPlan(null)}>
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleUpdatePlan}
                                                className="bg-orange-500 hover:bg-orange-600"
                                            >
                                                Update Plan
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
