import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';
import { fetchUserTrick } from '@/services/query-service';
import { getMongoUserID } from '@/services/session-service';
import UserTrickFactory from '@/models/user-trick/user-trick-factory';
import UserTrickUpdateRequest from './UserTrickUpdateRequest';

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
			`GET api/user-trick/${trickName} failed with error ${
				(e as Error).message
			}`
		);
		return NextResponse.json({});
	}
}

export async function POST(
	request: Request,
	{ params }: { params: { trickName: string } }
) {
	const { trickName } = params;
	console.log(`POST UserTrick ${trickName}`);

	try {
		const userID = await getMongoUserID();
		if (userID === null) {
			console.warn('POST /user-trick/ aborting: no session');
			return NextResponse.json({});
		}
		console.log(`POST userID: ${userID}`);
		const userIDString = userID.toString();

		const client = await clientPromise;
		const db = client.db(DB);
		const collection = db.collection(COLLECTION);

		const userTrick = UserTrickFactory.CreateEmpty(trickName, userIDString);
		console.log('POSTING', userTrick);

		const result = await collection.insertOne(
			UserTrickFactory.ToMongoDocument(userTrick)
		);

		console.log('POST result', result);
		return NextResponse.json(result);
	} catch (e) {
		console.error(
			`POST /user-trick/ failed with error ${(e as Error).message}`
		);
		return NextResponse.error();
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: { trickName: string } }
) {
	const requests: UserTrickUpdateRequest[] = await request.json();
	const { trickName } = params;
	console.log(`PATCH UserTrick ${trickName} given requests`, requests);

	const userID = await getMongoUserID();

	try {
		const client = await clientPromise;
		const db = client.db(DB);
		const collection = db.collection(COLLECTION);

		const filter = { trickName: trickName, user: userID };

		requests.forEach(async (request) => {
			let updateDoc = {};

			if (request.field === 'landingStances') {
				updateDoc =
					request.action === 'add'
						? { $addToSet: { [request.field]: request.value } }
						: { $pull: { [request.field]: request.value } };
			} else if (request.field === 'entryTransitions') {
				const key = `entryTransitions.${request.stance}`;
				updateDoc =
					request.action === 'add'
						? { $addToSet: { [key]: request.value } }
						: { $pull: { [key]: request.value } };
			} else if (request.field === 'notes') {
				if (request.action === 'replace') {
					updateDoc = { $set: { [request.field]: request.value } };
				}
			}

			const options = { upsert: true };

			const result = await collection.updateOne(
				filter,
				updateDoc,
				options
			);
			console.log('PATCH result', result);
		});

		return NextResponse.json({ message: 'Successfully updated' });
	} catch (e) {
		console.error(
			`PATCH /user-trick/ failed with error ${(e as Error).message}`
		);
		return NextResponse.error();
	}
}

/** Fully typesafe possible alternative:

type OperationType<T> = 
  | { op: "set"; value: T }
  | { op: "addToSet"; value: T }
  | { op: "pull"; value: T };

interface UserTrickOperations {
  trickName?: OperationType<string>;
  user?: OperationType<ObjectId>;
  entryTransitions?: {
    [stance: string]: OperationType<string[]>;
  };
  landingStances?: OperationType<string[]>;
  notes?: OperationType<string>;
}

export async function PATCH(
  request: Request,
  { params }: { params: { trickName: string } }
) {
  const userID = await getMongoUserID();
  const { trickName } = params;
  const userTrickOperations: UserTrickOperations = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db(DB);
    const collection = db.collection(COLLECTION);

    const filter = { trickName: trickName, user: userID };
    const updateDoc = {};

    for (const [field, operation] of Object.entries(userTrickOperations)) {
      if (operation) {
        updateDoc[`$${operation.op}`] = {
          [field]: operation.value,
        };
      }
    }

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
**/
