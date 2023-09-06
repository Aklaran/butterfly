import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';
import UserTrick from '@/models/user-trick/user-trick';
import { PartialUpdate } from '@/types/partial-update';

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

export async function GET(
	request: Request,
	{ params }: { params: { trickName: string } }
) {
	const trickName = params.trickName;

	try {
		const client = await clientPromise;
		const db = client.db(DB);

		const cursor = db
			.collection(COLLECTION)
			.find({ userID: 'bo-test-id', trickName: trickName });

		const result = [];

		try {
			for await (const doc of cursor) {
				const trick = UserTrick.FromMongoDocument(doc);
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

export async function PATCH(
	request: Request,
	{ params }: { params: { trickName: string } }
) {
	const partial: PartialUpdate = await request.json();
	const { trickName } = params;
	console.log('PATCH called with request:', partial, params);

	try {
		const client = await clientPromise;
		const db = client.db(DB);
		const collection = db.collection(COLLECTION);

		const filter = { trickName: trickName, userID: 'bo-test-id' };

		const updateDoc = {
			$set: partial,
		};

		const options = { upsert: true };

		const result = await collection.updateOne(filter, updateDoc, options);
		console.log(
			`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
		);
	} catch (e) {
		console.error(
			`PATCH /user-trick/ failed with error ${(e as Error).message}`
		);
		return NextResponse.error();
	}
}
