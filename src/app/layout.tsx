import '@/css/reset.css';
import '@/css/global-styles.css';

import { Inter } from 'next/font/google';
import React from 'react';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';

import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Trickidex',
	// eslint-disable-next-line quotes
	description: "Gotta land 'em all",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
