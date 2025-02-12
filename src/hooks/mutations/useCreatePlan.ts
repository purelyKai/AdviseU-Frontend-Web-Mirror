import { NewPlan } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from '../use-toast';

const createPlan = async (plan: NewPlan) => {
    const response = await fetch(`/api/plans`, {
        method: 'POST',
        body: JSON.stringify({ plan }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const useCreatePlan = (plan: NewPlan) => {
    return useMutation({
        mutationKey: ['courses', plan],
        mutationFn: () => createPlan(plan),
        onSuccess: () => {
            toast({
                title: `Plan Created: ${plan.name}`,
                description: 'Your plan has been created successfully.',
                color: 'green',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                color: 'red',
            });
        },
    });
};
