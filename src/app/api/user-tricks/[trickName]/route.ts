import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';
import { PartialUpdate } from '@/types/partial-update';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AdapterUser } from 'next-auth/adapters';
import { ObjectId } from 'mongodb';
import { fetchUserTrick } from '@/services/query-service';

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
	console.log(`GET api/user-tricks/${trickName}`);

	try {
		const result = await fetchUserTrick(trickName);
		console.log(`GET api/user-tricks/${trickName} result: `, result);
		return NextResponse.json(result);
	} catch (e) {
		console.error(
			`GET /user-trick/${trickName} failed with error ${
				(e as Error).message
			}`
		);
		return NextResponse.json({});
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: { trickName: string } }
) {
	const partial: PartialUpdate = await request.json();
	const { trickName } = params;
	const session = await getServerSession(authOptions);
	const user = session?.user as AdapterUser;
	const userID = new ObjectId(user.id);

	try {
		const client = await clientPromise;
		const db = client.db(DB);
		const collection = db.collection(COLLECTION);

		const filter = { trickName: trickName, user: userID };

		const updateDoc = {
			$set: partial,
		};

		const options = { upsert: true };

		const result = await collection.updateOne(filter, updateDoc, options);
		console.log(
			`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
		);
		return NextResponse.json(result);
	} catch (e) {
		console.error(
			`PATCH /user-trick/ failed with error ${(e as Error).message}`
		);
		return NextResponse.error();
	}
}
