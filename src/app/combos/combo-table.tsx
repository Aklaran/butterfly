'use client';
// TODO: Move these columns to a more generalized folder location
import { columns } from '@/components/combo-generator/columns';
import { DataTable } from '@/components/ui/data-table';
import { Combo, ComboData } from '@/models/combo/combo';
import React from 'react';

export default function ComboTable({
	comboDatas,
}: {
	comboDatas: ComboData[];
}) {
	const combos = comboDatas.map((data) => new Combo(data));
	return <DataTable columns={columns} data={combos} />;
}
