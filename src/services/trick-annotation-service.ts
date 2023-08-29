import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import Trick from '@/models/trick/trick';
import UserTrick from '@/models/user-trick/user-trick';

export default class TrickAnnotationService {
	constructor() {}

	annotateTricks(
		tricks: Trick[],
		userTricks: UserTrick[] | undefined
	): AnnotatedTrick[] {
		console.log('input tricks:', tricks);
		console.log('input userTricks:', userTricks);

		const result = tricks.map((trick) => {
			console.log('annotating trick:', trick);
			const userTrick = userTricks?.find(
				(userTrick) => userTrick.trickName == trick.name
			);

			console.log('found userTrick:', userTrick);
			console.log(userTrick?.trickName);

			return AnnotatedTrick.fromTricks(trick, userTrick);
		});

		console.log('output annotatedTricks:', result);
		return result;
	}

	// TODO:  updateAnnotations()
}
