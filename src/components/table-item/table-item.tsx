import React from 'react';
import { Switch } from '../ui/switch';

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
			<Switch onClick={onActivePress} checked={isActive} />
		</div>
	);
}
