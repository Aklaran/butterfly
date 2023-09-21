import React from 'react';
import { fetchAllTrickData } from '@/services/query-service';
import ComboGenerator from '@/components/combo-generator/combo-generator';

export default async function ComboGenPage() {
	const tricks = await fetchAllTrickData();
	return <ComboGenerator tricks={tricks} />;
}
