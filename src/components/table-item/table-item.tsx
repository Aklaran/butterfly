import React from 'react';
import { Checkbox } from '../ui/checkbox';

interface TableProps {
	label: string;
	isActive: boolean;
	onActivePress?: () => void;
}

export default function TableItem({
	label,
	isActive,
	onActivePress,
}: TableProps) {
	return (
		<div className='flex justify-between'>
			<p>{label}</p>
			<Checkbox
				aria-readonly
				checked={isActive}
				onClick={onActivePress}
			/>
		</div>
	);
}
