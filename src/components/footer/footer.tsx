'use client';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Footer() {
	return (
		<QueryClientProvider client={queryClient}>
			<footer className='mt-auto bg-primary h-[30px] text-primary-foreground flex justify-center'>
				<p>
					Created by{' '}
					<a href='https://instagram.com/botbunk'>Bo Tembunkiart</a>
				</p>
			</footer>
		</QueryClientProvider>
	);
}
