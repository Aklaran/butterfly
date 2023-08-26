import { Collection } from 'mongodb';

import clientPromise from '@/lib/mongodb';
// import { cache } from 'react';
import UserTrick from '@/models/user-trick/user-trick';

export default class UserTrickController {
	static readonly DB = process.env.DB_NAME as string;
	static readonly COLLECTION = process.env
		.USER_TRICKS_COLLECTION_NAME as string;

	// https://stackoverflow.com/questions/35743426/async-constructor-functions-in-typescript
	// https://pdconsec.net/blogs/devnull/asynchronous-constructor-design-pattern
	public initialized: Promise<void>;

	// Should only be used inside an initialized block;
	private _collection: Collection | undefined;

	constructor() {
		if (!UserTrickController.DB) {
			console.log(process.env.DB);

			throw new Error(
				'UserTrickController constructor failed: No Database'
			);
		}

		if (!UserTrickController.COLLECTION) {
			console.log(process.env.TRICKS_COLLECTION_NAME);

			throw new Error(
				'UserTrickController constructor failed: No Collection'
			);
		}

		this.initialized = this.initialize();
	}

	private async initialize(): Promise<void> {
		try {
			const client = await clientPromise;

			this._collection = client
				.db(UserTrickController.DB)
				.collection(UserTrickController.COLLECTION);
		} catch (e) {
			throw new Error(
				`TrickController initialize() failed with error: ${
					(e as Error).message
				}`
			);
		}
	}

	// Make & save a userID (has to happen in a different 'use client' class)
	// getAllUserTricks(userID)
	// getUserTrick(trickName, userID)
}
