import { fetchAllUserComboData } from '@/services/query-service';
import React from 'react';
import Link from 'next/link';
import ComboTable from './combo-table';

export default async function ComboIndex() {
	const combos = await fetchAllUserComboData();

	return (
		<div>
			<h1>Combos</h1>
			{!combos || combos.length === 0 ? (
				<p>
					Nothing here. Go{' '}
					<Link href='/combo-gen'>generate some combos!</Link>
				</p>
			) : (
				<ComboTable comboDatas={combos} />
			)}
		</div>
	);
}
