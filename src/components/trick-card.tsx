import React from 'react';

import Trick from '@/models/trick/trick';

function TrickCard({ trick }: { trick: Trick }) {
	return (
		<div className='wrapper'>
			<h1>{trick.name}</h1>
			<h2>Entry Transitions</h2>
			<ul>
				{Object.keys(trick.entryTransitions).map((stance, index) => (
					<li key={index}>
						<span>{stance}</span>
						<span>{trick.entryTransitions[stance]}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export default TrickCard;
