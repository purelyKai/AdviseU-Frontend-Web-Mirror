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

export type Plan = NewPlan & {
    _id: number;
};

export type NewPlan = {
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

export const defaultExtension: ProfileExtension = {
    majors: [],
    concentrations: [],
    minors: [],
    user_preferences: { likes_outdoors: 0 },
    plans: [],
};

export type Params = Promise<{ planId: string }>;

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
