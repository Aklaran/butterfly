import Link from 'next/link';
import React from 'react';

export default function Home() {
	const pages = [
		{
			label: 'Tricktionary',
			route: '/tricks',
		},
		{
			label: 'Combo Generator',
			route: '/combo-gen',
		},
		{
			label: 'What is this?',
			route: '/about',
		},
	];

	return (
		<div>
			<ul>
				{pages.map(({ label, route }) => (
					<li key={route}>
						<Link href={route}>{label}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
