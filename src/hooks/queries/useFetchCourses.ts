import { Course } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { connection } from 'next/server';

const fetchCourses = async (query: string | null) => {
    await connection(); // wait for runtime env variables to load

    if (!query) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/catalog`);
        const data = await response.json();
        return data;
    }
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/catalog?course_query=${query.toUpperCase()}`
    );
    const data = await response.json();
    return data as Course[];
};

export const useFetchCourses = (query: string | null) => {
    return useQuery({
        queryKey: ['courses', query],
        queryFn: () => fetchCourses(query),
    });
};
