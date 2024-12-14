import { cn } from '@/lib/utils';
import { Loader2, LucideLoader } from 'lucide-react';

export default function Loader({ className }: any) {
    return (
        <div className={cn('animate-spin h-12 w-12', className)}>
            <Loader2 size={48} />
        </div>
    );
}
