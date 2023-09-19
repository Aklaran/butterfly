import React from 'react';
import { fetchAllTricks, fetchAllUserTricks } from '@/services/query-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import ComboGenerator from '@/components/combo-generator/combo-generator';

export default async function ComboGenPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return <ComboGenerator tricks={tricks} />;
	} else {
		const tricks = await fetchAllTricks();
		const userTricks = await fetchAllUserTricks();
		return <ComboGenerator tricks={tricks} userTricks={userTricks} />;
	}
}
