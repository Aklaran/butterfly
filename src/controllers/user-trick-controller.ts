import UserTrick from '@/models/user-trick/user-trick';

export default class UserTrickController {
	constructor() {}

	async getAllUserTricks() {
		return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-tricks`).then(
			(response) => {
				console.log('react queried some USER tricks');

				return response.json() as unknown as UserTrick[];
			}
		);
	}
}
