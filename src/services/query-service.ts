import clientPromise from '@/lib/mongodb';
import Trick from '@/models/trick/trick';
import UserTrick from '@/models/user-trick/user-trick';
import { getMongoUserID } from './session-service';

export async function fetchTrick(name: string) {
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
		return result;
	} catch (e) {
		console.error(
			`fetchTrick(${name}) failed with error ${(e as Error).message}`
		);
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

		const result = UserTrick.FromMongoDocument(queryResult);
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
