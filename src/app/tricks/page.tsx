'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import Tricktionary from '@/components/tricktionary/tricktionary';

async function getTricks() {
	return fetch('api/tricks').then((response) => response.json());
}

export default function TricksList() {
	const tricksQuery = useQuery({
		queryKey: ['tricks'],
		queryFn: getTricks,
	});

	if (tricksQuery.isLoading) return <h1>loading...</h1>;
	if (tricksQuery.isError)
		return <pre>{JSON.stringify(tricksQuery.error)}</pre>;

	const tricks = tricksQuery.data;

	return <Tricktionary tricks={tricks} />;
}
