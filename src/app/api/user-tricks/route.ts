import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { AdapterUser } from 'next-auth/adapters';
import UserTrickFactory from '@/models/user-trick/user-trick-factory';

const DB = process.env.DB_NAME as string;
const COLLECTION = process.env.USER_TRICKS_COLLECTION_NAME as string;

if (!DB) {
	throw new Error(
		`/tricks/ api failed: No Database. DB env var: ${process.env.DB}`
	);
}

if (!COLLECTION) {
	throw new Error(
		`/tricks/ api failed: No Collection. Collection env var: ${process.env.USER_TRICKS_COLLECTION_NAME}`
	);
}

export async function GET() {
	const session = await getServerSession(authOptions);
	const user = session?.user as AdapterUser;

	try {
		const client = await clientPromise;
		const db = client.db(DB);

		const userID = new ObjectId(user?.id);
		const cursor = db.collection(COLLECTION).find({ user: userID });

		const result = [];

		try {
			for await (const doc of cursor) {
				const trick = UserTrickFactory.CreateFromMongoDocument(doc);
				result.push(trick);
			}
		} finally {
			cursor.close();
		}

		return NextResponse.json(result);
	} catch (e) {
		console.error(`GET /trick/ failed with error ${(e as Error).message}`);
		return NextResponse.error();
	}
}
