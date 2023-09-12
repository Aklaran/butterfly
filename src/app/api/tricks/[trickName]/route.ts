// import { NextResponse } from 'next/server';

// import clientPromise from '@/lib/mongodb';
// import Trick from '@/models/trick/trick';

const DB = process.env.DB_NAME as string;
const COLLECTION = process.env.TRICKS_COLLECTION_NAME as string;

if (!DB) {
	throw new Error(
		`/tricks/ api failed: No Database. DB env var: ${process.env.DB}`
	);
}

if (!COLLECTION) {
	throw new Error(
		`/tricks/ api failed: No Collection. Collection env var: ${process.env.TRICKS_COLLECTION_NAME}`
	);
}

export async function GET(request: Request) {
	console.log('Get SINGLE TRICK called');
	console.log(request);

	// try {
	// 	const client = await clientPromise;
	// 	const db = client.db(DB);

	// 	const cursor = db.collection(COLLECTION).find({});

	// 	const result = [];

	// 	try {
	// 		for await (const doc of cursor) {
	// 			const trick = Trick.FromMongoDocument(doc);
	// 			result.push(trick);
	// 		}
	// 	} finally {
	// 		await cursor.close();
	// 	}

	// 	return NextResponse.json(result);
	// } catch (e) {
	// 	console.error(`GET /trick/ failed with error ${(e as Error).message}`);
	// 	return NextResponse.error();
	// }
}
