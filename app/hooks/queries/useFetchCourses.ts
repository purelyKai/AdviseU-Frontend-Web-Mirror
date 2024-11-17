import { API_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

const fetchCourses = async (department: string | null) => {
    if (!department) return [];

    const response = await fetch(`${API_URL}/catalog?department=${department}`);
    const data = await response.json();
    return data;
};

export const useFetchCourses = (department: string | null) => {
    return useQuery({
        queryKey: ['courses', department],
        queryFn: () => fetchCourses(department),
    });
};
