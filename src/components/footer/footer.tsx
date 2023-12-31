'use client';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Footer() {
	return (
		<QueryClientProvider client={queryClient}>
			<footer className='mt-auto bg-primary h-[30px] text-primary-foreground flex justify-center'>
				<p>
					Got feedback?{' '}
					<a
						className='text-bordeauxLight'
						href='https://instagram.com/botbunk'
					>
						Let Bo know!
					</a>
				</p>
			</footer>
		</QueryClientProvider>
	);
}
