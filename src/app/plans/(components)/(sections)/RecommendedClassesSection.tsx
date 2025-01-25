import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecommendedClassesSectionProps {
    classes: string[];
}

export default function RecommendedClassesSection({ classes }: RecommendedClassesSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recommended Classes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {classes.map((cls, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
                            {cls}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
