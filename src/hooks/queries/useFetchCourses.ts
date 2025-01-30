import { useQuery } from '@tanstack/react-query';
import { Course } from '@/lib/types';

const fetchCourses = async (query: string | null): Promise<Course[]> => {
    const url = new URL('/api/courses', window.location.href);
    if (query) {
        url.searchParams.append('query', query);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }

    const data = await response.json();
    return data as Course[];
};

export const useFetchCourses = (query: string | null) => {
    return useQuery<Course[], Error>({
        queryKey: ['courses', query],
        queryFn: () => fetchCourses(query),
        enabled: query !== null, // Only run the query when a query is provided
    });
};
