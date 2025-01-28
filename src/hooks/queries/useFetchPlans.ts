import { useQuery } from '@tanstack/react-query';

import mockData from '@/mockdata/plans.json';
import { Plan } from '@/lib/types';

const fetchPlans = async (userId: number) => {
    if (!userId) return [];

    const response = await fetch(`${process.env.BACKEND_API_URL}/catalog?department=${userId}`);
    const data = await response.json();
    return data;
};

const mockFetchPlans = async (userId: number) => {
    if (!userId) return [];

    const data = mockData;
    const plans = data.plans as Plan[];
    return plans;
};

export const useFetchPlans = (userId: number) => {
    return useQuery({
        queryKey: ['courses', userId],
        queryFn: () => mockFetchPlans(userId), // NOTE: Replace with fetchPlans once integrated with backend,
    });
};
