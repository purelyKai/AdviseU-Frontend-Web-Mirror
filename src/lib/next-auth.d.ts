// src/types/next-auth.d.ts
import { ProfileExtension } from './types';
import { User, Session } from 'next-auth';
import AdapterUser from '@auth/core/adapters';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface User extends DefaultUser {
        extension: ProfileExtension;
    }

    interface Session {
        user: User;
    }
}

declare module '@auth/core/adapters' {
    interface AdapterUser {
        extension: ProfileExtension;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        extension: ProfileExtension;
    }
}
