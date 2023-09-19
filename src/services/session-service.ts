import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

export async function getMongoUserID() {
	const session = await getServerSession(authOptions);

	if (session === null) {
		console.log('getMongoUserID() did not find a session');
		return null;
	}

	const user = session?.user as AdapterUser;
	return new ObjectId(user.id);
}
