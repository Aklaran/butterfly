import clientPromise from '@/lib/mongodb';
import Trick from '@/models/trick/trick';
import { getMongoUserID } from './session-service';
import UserTrickFactory from '@/models/user-trick/user-trick-factory';

export async function fetchAllTrickData() {
	console.log('fetchAllTricks()');

	const DB = process.env.DB_NAME as string;
	const COLLECTION = process.env.TRICKS_COLLECTION_NAME as string;

	try {
		const client = await clientPromise;
		const db = client.db(DB);

		const cursor = db.collection(COLLECTION).find({});

		const result = [];

		try {
			for await (const doc of cursor) {
				const trick = Trick.FromMongoDocument(doc);
				result.push(trick.data);
			}
		} finally {
			await cursor.close();
		}

		return result;
	} catch (e) {
		console.error(`GET /trick/ failed with error ${(e as Error).message}`);
		return [];
	}
}

export async function fetchTrickData(name: string) {
	console.log(`fetchTrick(${name})`);

	const DB = process.env.DB_NAME as string;
	const COLLECTION = process.env.TRICKS_COLLECTION_NAME as string;

	try {
		const client = await clientPromise;
		const db = client.db(DB);

		const queryResult = await db
			.collection(COLLECTION)
			.findOne({ name: name });

		if (!queryResult) {
			throw new Error(`Trick ${name} not found in DB`);
		}

		const result = Trick.FromMongoDocument(queryResult);
		return result.data;
	} catch (e) {
		console.error(
			`fetchTrick(${name}) failed with error ${(e as Error).message}`
		);
	}
}

export async function fetchAllUserTrickData() {
	console.log('fetchAllUserTricks()');

	const DB = process.env.DB_NAME as string;
	const COLLECTION = process.env.USER_TRICKS_COLLECTION_NAME as string;

	try {
		const userObjectID = await getMongoUserID();

		if (userObjectID === null) {
			return null;
		}
		const client = await clientPromise;
		const db = client.db(DB);

		const cursor = db.collection(COLLECTION).find({ user: userObjectID });

		const result = [];

		try {
			for await (const doc of cursor) {
				const trick = UserTrickFactory.CreateFromMongoDocument(doc);
				result.push(trick);
			}
		} finally {
			cursor.close();
		}

		return result;
	} catch (e) {
		console.error(`GET /trick/ failed with error ${(e as Error).message}`);
		return null;
	}
}

export async function fetchUserTrick(trickName: string) {
	console.log(`fetchUserTrick(${trickName})`);

	const DB = process.env.DB_NAME as string;
	const COLLECTION = process.env.USER_TRICKS_COLLECTION_NAME as string;

	try {
		const userObjectID = await getMongoUserID();

		if (userObjectID === null) {
			return null;
		}

		const client = await clientPromise;
		const db = client.db(DB);

		const queryResult = await db
			.collection(COLLECTION)
			.findOne({ trickName: trickName, user: userObjectID });

		if (!queryResult) {
			throw new Error(
				`UserTrick ${trickName} for user ${userObjectID} not found in DB`
			);
		}

		const result = UserTrickFactory.CreateFromMongoDocument(queryResult);
		console.log(result);
		return result;
	} catch (e) {
		console.error(
			`fetchUserTrick(${trickName})  failed with error ${
				(e as Error).message
			}`
		);

		return null;
	}
}
