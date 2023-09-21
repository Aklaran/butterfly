import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

export default function Spinner() {
	return (
		<div className='flex justify-center items-center h-[20dvh]'>
			<CircleLoader color='hsl(339, 100%, 30%)' />
		</div>
	);
}
