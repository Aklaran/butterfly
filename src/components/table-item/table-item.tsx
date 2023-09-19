import React from 'react';
import { Checkbox } from '../ui/checkbox';

interface TableProps {
	label: string;
	isActive: boolean;
}

export default function TableItem({ label, isActive }: TableProps) {
	return (
		<div className='flex'>
			<p>{label}</p>
			<Checkbox aria-readonly checked={isActive} />
		</div>
	);
}
