import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TooltipWrapperProps {
    children: React.ReactNode;
    tooltipText: string;
    delay?: number;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ children, tooltipText, delay }) => {
    return (
        <TooltipProvider delayDuration={delay ?? 200}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>{tooltipText}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TooltipWrapper;
