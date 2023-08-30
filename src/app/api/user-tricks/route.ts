import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';
import UserTrick from '@/models/user-trick/user-trick';

const DB = process.env.DB_NAME as string;
const COLLECTION = process.env.USER_TRICKS_COLLECTION_NAME as string;

if (!DB) {
	console.log(process.env.DB);

	throw new Error('/tricks/ api failed: No Database');
}

if (!COLLECTION) {
	console.log(process.env.USER_TRICKS_COLLECTION_NAME);

	throw new Error('/tricks/ api failed: No Collection');
}

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db(DB);

		const cursor = db.collection(COLLECTION).find({ userID: 'bo-test-id' });

		const result = [];

		try {
			for await (const doc of cursor) {
				const trick = UserTrick.FromMongoDocument(doc);
				console.log('User Trick API got trick: ', trick);
				result.push(trick);
			}
		} finally {
			cursor.close();
		}

		console.log('END OF GET', result);

		return NextResponse.json(result);
	} catch (e) {
		console.log(`GET /trick/ failed with error ${(e as Error).message}`);
		return NextResponse.error();
	}
}
