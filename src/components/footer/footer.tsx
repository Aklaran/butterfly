'use client';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import styles from './footer.module.css';

const queryClient = new QueryClient();

export default function Footer() {
	return (
		<QueryClientProvider client={queryClient}>
			<footer className={styles.footer}>
				<p className={styles.text}>
					Created by{' '}
					<a
						className={styles.link}
						href='https://github.com/aklaran'
					>
						Bo Tembunkiart
					</a>
				</p>
			</footer>
		</QueryClientProvider>
	);
}
