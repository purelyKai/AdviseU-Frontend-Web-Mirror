'use client';
import React from 'react';
import { useFetchPlans } from '@/hooks/queries/useFetchPlans';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const ListPlansSection: React.FC = () => {
    const { data, isLoading, error } = useFetchPlans(1);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Plans</h2>
            {data!.map((plan) => (
                <Card className="p-2" key={plan.id}>
                    <h3>{plan.name}</h3>
                    <Link href={`/${plan.id}`}>View Plan</Link>
                </Card>
            ))}
        </div>
    );
};

export default ListPlansSection;
