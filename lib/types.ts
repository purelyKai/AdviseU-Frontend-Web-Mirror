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
