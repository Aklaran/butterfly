import { Collection } from 'mongodb';

import clientPromise from '@/lib/mongodb';
// import { cache } from 'react';
import Trick from '@/models/trick/trick';

export const revalidate = 1;

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

	async getAllTricks() {
		return this.initialized.then(async () => {
			const cursor = (this._collection as Collection).find({}).limit(10);

			const result = [];

			for await (const doc of cursor) {
				const trick = Trick.FromMongoDocument(doc);
				result.push(trick);
			}

			console.log(result.length);
			return result;

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

	async getTrick(name: string) {
		return this.initialized.then(async () => {
			const cursor = await (this._collection as Collection).findOne({
				name: name,
			});

			if (cursor === null) {
				throw new Error(
					`TrickController.getTrick() failed to fetch trick with name: ${name}`
				);
			}

			return Trick.FromMongoDocument(cursor);
		});
	}
}
