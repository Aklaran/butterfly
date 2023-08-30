import React from 'react';

interface TableProps {
	label: string;
	isActive: boolean;
}

export default function TableItem({ label, isActive }: TableProps) {
	console.log('creating TableItem for:', label);
	console.log('trick.isActive()?', isActive);

	return (
		<>
			<p>{label}</p>

			<input type='checkbox' readOnly checked={isActive} />
		</>
	);
}
