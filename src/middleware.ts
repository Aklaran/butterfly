import { NextRequest, NextResponse } from 'next/server';

const allowedOriginPattern =
	/^https:\/\/trickidex(-([a-zA-Z0-9-]+)?aklaran)?\.vercel\.app$/;

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});

	const origin = requestHeaders.get('origin');

	if (origin && allowedOriginPattern.test(origin)) {
		response.headers.set('Access-Control-Allow-Origin', origin);
		response.headers.set('Access-Control-Allow-Credentials', 'true');
		response.headers.set(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, DELETE, OPTIONS'
		);
		response.headers.set(
			'Access-Control-Allow-Headers',
			'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
		);
	}

	return response;
}
