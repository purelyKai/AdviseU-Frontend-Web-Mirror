import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './mongodb';

export const config = {
    //adapter: MongoDBAdapter(client),
    providers: [Google],
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
