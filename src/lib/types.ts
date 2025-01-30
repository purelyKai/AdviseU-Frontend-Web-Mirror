export type Term = {
    id: number;
    name: string;
    courses: Course[];
};

export type Course = {
    credits: string;
    course_name: string;
    course_number: string;
    department: string;
    description: string;
    prerequisites: string[];
    corequisites: string[];
};

export type Plan = {
    id: number;
    name: string;
    description: string;
    terms?: Term[];
};

/* To be adjusted based on future user preference options */
export type Preferences = {
    likes_outdoors: number;
};

export type ProfileExtension = {
    majors: string[];
    concentrations: string[];
    minors: string[];
    user_preferences: Preferences;
    plans: Plan[];
};

export type Params = Promise<{ planId: string }>;

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
