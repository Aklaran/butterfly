import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { MongoDBAdapter } from '@auth/mongodb-adapter';

import clientPromise from './mongodb';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	adapter: MongoDBAdapter(clientPromise, {
		databaseName: process.env.DB_NAME,
	}),
};
