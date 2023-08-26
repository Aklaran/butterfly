import { Collection } from 'mongodb';
// import { cache } from 'react';

export const revalidate = 1;

import clientPromise from '@/lib/mongodb';

export default class TrickController {
	static readonly DB = process.env.DB_NAME as string;
	static readonly COLLECTION = process.env.TRICKS_COLLECTION_NAME as string;

	// https://stackoverflow.com/questions/35743426/async-constructor-functions-in-typescript
	// https://pdconsec.net/blogs/devnull/asynchronous-constructor-design-pattern
	public initialized: Promise<void>;

	// Should only be used inside an initialized block;
	private _collection: Collection | undefined;

	constructor() {
		if (!TrickController.DB) {
			console.log(process.env.DB);

			throw new Error('TrickController constructor failed: No Database');
		}

		if (!TrickController.COLLECTION) {
			console.log(process.env.TRICKS_COLLECTION_NAME);

			throw new Error(
				'TrickController constructor failed: No Collection'
			);
		}

		this.initialized = this.initialize();
	}

	private async initialize(): Promise<void> {
		try {
			const client = await clientPromise;

			this._collection = client
				.db(TrickController.DB)
				.collection(TrickController.COLLECTION);
		} catch (e) {
			console.log(
				`TrickController initialize() failed with error: ${
					(e as Error).message
				}`
			);
		}
	}

	async getTricks() {
		console.log('getTricks() called');
		this.initialized.then(async () => {
			console.log('getTricks() confirmed inited');

			const cursor = (this._collection as Collection).find({}).limit(10);

			for await (const doc of cursor) {
				console.log(doc);
			}

			// 	cache(async () => {
			// 		console.log('getTricks() inside cache block');
			// 		const cursor = (this._collection as Collection)
			// 			.find({})
			// 			.limit(10);

			// 		for await (const doc of cursor) {
			// 			console.log(doc);
			// 		}
			// 	});
		});
	}
}
