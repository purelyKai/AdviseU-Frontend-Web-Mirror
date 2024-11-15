import { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useTermsStore } from '../store';
import { Card } from '@/components/ui/card';

const RemoveTermsButton = () => {
    const { terms, removeTerm } = useTermsStore();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center">
                    <h3>Remove Terms</h3>
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Remove Terms</DialogTitle>
                <ul className="flex flex-col gap-3">
                    {terms.map((term) => (
                        <Card key={term.id} className="p-2">
                            <div className="flex justify-between items-center gap-2 px-3">
                                <h2>{term.name}</h2>
                                <Button variant="destructive" onClick={() => removeTerm(term)}>
                                    Delete Term
                                </Button>
                            </div>
                        </Card>
                    ))}
                </ul>
                <DialogClose asChild>
                    <Button variant="default">Close</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default RemoveTermsButton;
