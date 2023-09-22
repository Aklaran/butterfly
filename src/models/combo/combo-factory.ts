import { Document, ObjectId, WithId } from 'mongodb';
import { ComboData, ComboStep } from './combo';

export default class ComboFactory {
	static CreateFromMongoDocument(doc: WithId<Document>): ComboData {
		const data: ComboData = {
			steps: doc.steps as ComboStep[],
			user: doc.user?.toString(),
			notes: doc.notes,
			_id: doc._id.toString(),
		};
		return data;
	}

	static ToMongoDocument(data: ComboData): WithId<Document> {
		const doc: WithId<Document> = {
			steps: data.steps,
			user: new ObjectId(data.user),
			notes: data.notes,
			_id: new ObjectId(data._id),
		};
		return doc;
	}
}
