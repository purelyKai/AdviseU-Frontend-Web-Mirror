export interface Term {
    id: number;
    name: string;
    courses: Course[];
}

export interface Course {
    id: number;
    code: string;
    title: string;
}
