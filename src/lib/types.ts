export interface Term {
    id: number;
    name: string;
    courses: Course[];
}

export interface Course {
    credits: string;
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

/* To be adjusted based on future user preference options */
export interface UserPreferences {
    likes_outdoors: number;
}

export interface UserAccount {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    majors: string[];
    concentrations: string[];
    minors: string[];
    user_preferences: UserPreferences;
    plans: Plan[];
}

export type Params = Promise<{ planId: string }>;

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
