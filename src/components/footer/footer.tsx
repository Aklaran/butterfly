'use client';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Footer() {
	return (
		<QueryClientProvider client={queryClient}>
			<footer>
				<p>
					Created by{' '}
					<a href='https://github.com/aklaran'>Bo Tembunkiart</a>
				</p>
			</footer>
		</QueryClientProvider>
	);
}
