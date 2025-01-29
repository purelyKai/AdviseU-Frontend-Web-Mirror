import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RecommendedClassesSection() {
    const recommendedClasses = ['CS 325', 'CS 340', 'CS 372'];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recommended Classes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {recommendedClasses.map((cls, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
                            {cls}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
