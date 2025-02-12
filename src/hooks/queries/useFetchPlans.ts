import { useQuery } from '@tanstack/react-query';

const fetchPlans = async () => {
    const response = await fetch(`/api/plans`);
    const data = await response.json();
    return data;
};

export const useFetchPlans = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: () => fetchPlans(),
    });
};
