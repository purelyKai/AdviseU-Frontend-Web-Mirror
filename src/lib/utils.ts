import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Helper function to format prerequisites/corequisites
const formatRequisites = (requisites: string[][]) => {
    return requisites.map((group, index) => {
        const groupText = group.join(' or ');

        // If there are multiple groups, add parentheses around each group for "and"
        const formattedGroup = requisites.length > 1 ? `(${groupText})` : groupText;

        return `${formattedGroup}${index < requisites.length - 1 ? ' and ' : ''}`;
    });
};
