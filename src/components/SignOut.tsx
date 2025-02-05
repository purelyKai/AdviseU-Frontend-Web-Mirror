import { signOut } from '@/lib/auth';
import { Button } from './ui/button';

export default function SignOut() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}
        >
            <Button variant="outline" type="submit">Log Out</Button>
        </form>
    );
}
