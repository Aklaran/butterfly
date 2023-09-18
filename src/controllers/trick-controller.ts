import { API_URL } from '@/lib/constants';
import Trick from '@/models/trick/trick';

export default class TrickController {
	constructor() {}

	async getAllTricks() {
		const result = await fetch(`${API_URL}/tricks`).then((response) => {
			return response.json() as unknown as Trick[];
		});

		return result;
	}

	async getTrick(name: string) {
		await fetch(`${API_URL}/tricks/${name}`);
	}
}
