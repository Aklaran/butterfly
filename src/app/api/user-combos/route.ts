import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';
import { fetchAllUserComboData } from '@/services/query-service';
import { getMongoUserID } from '@/services/session-service';
import { ComboData } from '@/models/combo/combo';
import ComboFactory from '@/models/combo/combo-factory';

const DB = process.env.DB_NAME as string;
const COLLECTION = process.env.USER_COMBOS_COLLECTION_NAME as string;

if (!DB) {
	throw new Error(
		`/user-combos api failed: No Database. DB env var: ${process.env.DB}`
	);
}

if (!COLLECTION) {
	throw new Error(
		`/user-combos api failed: No Collection. Collection env var: ${process.env.USER_COMBOS_COLLECTION_NAME}`
	);
}

export async function GET() {
	console.log('GET api/user-combos');

	try {
		const result = await fetchAllUserComboData();
		console.log('GET api/user-combos result: ', result);
		return NextResponse.json(result);
	} catch (e) {
		console.error(
			`GET api/user-combos failed with error ${(e as Error).message}`
		);
		return NextResponse.json({});
	}
}

export async function POST(request: Request) {
	const combo: ComboData = await request.json();

	console.log('POST UserCombo', combo);

	try {
		const userID = await getMongoUserID();
		if (userID === null) {
			console.warn('POST /user-combo aborting: no session');
			return NextResponse.json({});
		}
		console.log(`POST userID: ${userID}`);

		if (!combo.user) {
			combo.user = userID.toString();
		}

		const client = await clientPromise;
		const db = client.db(DB);
		const collection = db.collection(COLLECTION);

		const result = await collection.insertOne(
			ComboFactory.ToMongoDocument(combo)
		);

		console.log('POST result', result);
		return NextResponse.json(result);
	} catch (e) {
		console.error(
			`POST /user-combo failed with error ${(e as Error).message}`
		);
		return NextResponse.error();
	}
}
