import React from 'react';
import {
	fetchAllTrickData,
	fetchAllUserTrickData,
} from '@/services/query-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import ComboGenerator from '@/components/combo-generator/combo-generator';

export default async function ComboGenPage() {
	const tricks = await fetchAllTrickData();

	const session = await getServerSession(authOptions);

	if (!session) {
		return <ComboGenerator tricks={tricks} userTricks={null} />;
	} else {
		const userTricks = await fetchAllUserTrickData();
		return <ComboGenerator tricks={tricks} userTricks={userTricks} />;
	}
}
