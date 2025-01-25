import { API_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

const fetchDepartments = async () => {
    const response = await fetch(`${API_URL}/catalogs`);
    const data = await response.json();

    return data;
};

export const useFetchDepartments = () => {
    return useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartments,
    });
};
