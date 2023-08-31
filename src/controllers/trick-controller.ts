import Trick from '@/models/trick/trick';

export default class TrickController {
	constructor() {}

	async getAllTricks() {
		const result = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/tricks`
		).then((response) => {
			return response.json() as unknown as Trick[];
		});

		return result;
	}

	async getTrick(name: string) {
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tricks/${name}`);
	}
}
