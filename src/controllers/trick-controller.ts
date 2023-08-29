import Trick from '@/models/trick/trick';

export default class TrickController {
	constructor() {}

	async getAllTricks() {
		const result = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/tricks`
		).then((response) => {
			return response.json() as unknown as Trick[];
		});

		console.log('trickController getAllTrick() result:', result);
		return result;
	}
}
