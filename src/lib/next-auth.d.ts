import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { ProfileExtension } from './types';

declare module 'next-auth' {
    interface User {
        extension: ProfileExtension;
    }

    interface Session {
        user: User & DefaultSession['user'];
    }
}

declare module '@auth/core/adapters' {
    interface AdapterUser {
        extension: ProfileExtension;
    }
}
