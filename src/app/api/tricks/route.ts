import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';
import Trick from '@/models/trick/trick';

const DB = process.env.DB_NAME as string;
const COLLECTION = process.env.TRICKS_COLLECTION_NAME as string;

if (!DB) {
	console.log(process.env.DB);

	throw new Error('/tricks/ api failed: No Database');
}

if (!COLLECTION) {
	console.log(process.env.TRICKS_COLLECTION_NAME);

	throw new Error('/tricks/ api failed: No Collection');
}

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db(DB);

		const cursor = db.collection(COLLECTION).find({});

		const result = [];

		try {
			for await (const doc of cursor) {
				const trick = Trick.FromMongoDocument(doc);
				result.push(trick);
			}
		} finally {
			await cursor.close();
		}

		console.log('Heres all the tricks', result);

		return NextResponse.json(result);
	} catch (e) {
		console.log(`GET /trick/ failed with error ${(e as Error).message}`);
		return NextResponse.error();
	}
}