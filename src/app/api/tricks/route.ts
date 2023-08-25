import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db('dev');

		const movies = await db
			.collection('tricks')
			.find({})
			.limit(10)
			.toArray();

		return NextResponse.json(movies);
	} catch (e) {
		console.error(e);
	}
}
