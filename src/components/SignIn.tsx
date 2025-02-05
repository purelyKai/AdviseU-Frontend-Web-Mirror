import { signIn } from '@/lib/auth';
import { Button } from './ui/button';

export default function SignIn() {
    return (
        <form
            action={async () => {
                'use server';
                await signIn('google');
            }}
        >
            <Button variant="outline" type="submit">
                Log In
            </Button>
        </form>
    );
}
