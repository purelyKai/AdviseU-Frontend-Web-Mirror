import { Button } from '@/components/ui/button';
import { useTermsStore } from '../store';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import emptyTerms from '@/app/mockdata/emptyTerms.json';

const AddTermsButton = () => {
    const { terms, addTerm } = useTermsStore();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center">
                    <h3>Add Terms</h3>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Terms</DialogTitle>
                <ul className="flex flex-col gap-3 max-h-[40vh] overflow-auto">
                    {emptyTerms.map((term) => {
                        if (terms.find((t) => t.id === term.id)) return null;
                        return (
                            <Card key={term.id} className="p-2">
                                <div className="flex justify-between items-center gap-2 px-3">
                                    <h2>{term.name}</h2>
                                    <Button onClick={() => addTerm(term)}>Add Term</Button>
                                </div>
                            </Card>
                        );
                    })}
                </ul>
                <DialogClose asChild>
                    <Button variant="default">Close</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default AddTermsButton;
