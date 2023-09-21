import Link from 'next/link';
import React from 'react';

export default function About() {
	return (
		<div className='p-6'>
			<h1 className='text-2xl font-semibold mb-4'>
				Welcome to Butterfly!
			</h1>
			<p className='mb-2'>
				Track your tricks and generate endless combos.
			</p>
			<p className='mb-2'>
				Visit the{' '}
				<Link href='/tricks' className='text-bordeaux underline'>
					Tricktionary
				</Link>{' '}
				to see your tricks.
			</p>
			<p className='mb-2'>
				Edit a trick to set transitions and landing stances.
			</p>
			<p className='mb-2'>
				Got some tricks? Try the{' '}
				<Link className='text-bordeaux underline' href='/combo-gen'>
					Combo Generator
				</Link>
				.
			</p>
			<p className='mb-2'>
				Set the combo length, hit Generate, and let it rip!
			</p>
			<p className='mb-2'>
				Find a bug or got feedback?{' '}
				<a
					className='text-bordeaux underline'
					href='https://instagram.com/botbunk'
				>
					DM me
				</a>
				.
			</p>
			<p className='mt-4'>
				Thanks for joining Butterfly. Happy tricking, and keep loving
				it!
			</p>
		</div>
	);
}
