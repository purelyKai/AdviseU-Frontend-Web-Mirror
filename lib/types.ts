export interface Term {
    id: number;
    name: string;
    courses: Course[];
}

export interface Course {
    credits: number;
    course_name: string;
    course_number: string;
    department: string;
    description: string;
    prerequisites: string[];
    corequisites: string[];
}

export interface Plan {
    id: number;
    name: string;
    terms: Term[];
}

export type Params = Promise<{ planId: string }>;

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
