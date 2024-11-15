import { Course, Term } from '@/lib/types';
import { create } from 'zustand';

type TermsStore = {
    terms: Term[];
    addTerm: (term: Term) => void;
    removeTerm: (term: Term) => void;
    initTerms: (terms: Term[]) => void;
    addCourseToTerm: (term: Term, course: Course) => void;
    removeCourseFromTerm: (term: Term, course: Course) => void;
};

export const useTermsStore = create<TermsStore>((set) => ({
    terms: [],
    addTerm: (term) => set((state) => ({ terms: [...state.terms, term] })),
    removeTerm: (term) => set((state) => ({ terms: state.terms.filter((t) => t.id !== term.id) })),
    initTerms: (terms) => set({ terms }),
    addCourseToTerm: (term, course) => {
        set((state) => ({
            terms: state.terms.map((t) => {
                if (t.id === term.id) {
                    return {
                        ...t,
                        courses: [...t.courses, course],
                    };
                }
                return t;
            }),
        }));
    },
    removeCourseFromTerm: (term, course) => {
        set((state) => ({
            terms: state.terms.map((t) => {
                if (t.id === term.id) {
                    return {
                        ...t,
                        courses: t.courses.filter((c) => c.id !== course.id),
                    };
                }
                return t;
            }),
        }));
    },
}));
