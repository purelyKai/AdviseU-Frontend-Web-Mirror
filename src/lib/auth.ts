import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './mongodb';
import authConfig from './auth.config';
import { ProfileExtension, defaultExtension } from './types';
import { ObjectId } from 'mongodb';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(client),
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.extension = user.extension || null;
            } else if (!token.extension && token.sub) {
                // Fetch from DB if missing
                const db = (await client).db();
                const dbUser = await db.collection('users').findOne({ _id: new ObjectId(token.sub) });
                token.extension = dbUser?.extension || null;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.extension) {
                session.user.extension = token.extension;
            }
            return session;
        },
    },
    ...authConfig,
    events: {
        async createUser({ user }) {
            const db = (await client).db();
            const userId = new ObjectId(user.id);
            await db
                .collection('users')
                .updateOne({ _id: userId }, { $set: { extension: defaultExtension } }, { upsert: true });
        },
    },
});
